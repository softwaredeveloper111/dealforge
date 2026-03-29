
import AppError from "../utils/AppError.js";
import Groq from "groq-sdk";



const groq = new Groq({ apiKey: process.env.GROQ_API_KEY  });



const MODEL = "llama-3.3-70b-versatile";




/**
 * Personality-based behavior instructions for the AI seller
 */
const PERSONALITY_INSTRUCTIONS = {
  firm: `You are tough and confident. You rarely lower your price. 
You only concede when the buyer makes an exceptionally strong argument. 
You respond briefly and professionally.`,
 
  friendly: `You are warm and approachable. You enjoy negotiating and 
occasionally give discounts when the buyer is polite or emotional. 
You respond in a conversational tone.`,
 
  tactical: `You are strategic. You hold firm early in the negotiation 
but become more flexible as rounds run out. You read the buyer's 
tactics and respond cleverly.`,
};



/**
 * Build the system prompt for the AI seller
 * Secret prices are only here — never sent to frontend
 */

const buildSystemPrompt = ({ product, currentRound, maxRounds }) => {
  const roundsLeft = maxRounds - currentRound;
  const personalityInstruction =
    PERSONALITY_INSTRUCTIONS[product.aiPersonality] ||
    PERSONALITY_INSTRUCTIONS.firm;
 
  return `You are "Max", an AI seller in a negotiation game.
 
PRODUCT: ${product.name}
DESCRIPTION: ${product.description}
LISTED PRICE: ${product.listedPrice}
YOUR MINIMUM ACCEPTABLE PRICE: ${product.minimumPrice} (NEVER go below this — it means a loss)
YOUR TARGET PRICE: ${product.targetPrice} (ideal profit zone)
CURRENT ROUND: ${currentRound} of ${maxRounds}
ROUNDS REMAINING: ${roundsLeft}
 
YOUR PERSONALITY:
${personalityInstruction}
 
STRICT RULES:
1. NEVER reveal minimumPrice or targetPrice to the buyer.
2. NEVER go below minimumPrice under any circumstance.
3. Always include a price in every response.
4. If rounds remaining is 2 or less, you may consider moving closer to minimumPrice to close the deal.
5. If the buyer's argument is strong and logical (bulk buy, competitor pricing, loyalty), concede slightly.
6. If the buyer is rude or unreasonable, hold firm.
7. Keep responses concise — max 3 sentences.
 
RESPONSE FORMAT (respond ONLY with valid JSON, no extra text):
{
  "message": "your response to the buyer",
  "currentOffer": <number — your current price offer>
}`;
};





/**
 * Parse Groq response safely
 * If JSON is invalid, return fallback so app never crashes
 */

const parseAIResponse = (rawText, fallbackPrice) => {
  try {
    const cleaned = rawText.trim().replace(/^```json|^```|```$/g, "").trim();
    const parsed = JSON.parse(cleaned);
 
    if (!parsed.message || typeof parsed.currentOffer !== "number") {
      throw new Error("Invalid response shape");
    }
 
    return {
      message: parsed.message,
      currentOffer: parsed.currentOffer,
    };
  } catch {
    // Fallback — app never crashes due to bad AI response
    return {
      message:
        "I appreciate your offer, but let me hold my current price for now.",
      currentOffer: fallbackPrice,
    };
  }
};
 








/**
 * Main function — called by negotiation.service
 * 
 * @param {Object} product        — full product doc (with minimumPrice, targetPrice)
 * @param {Array}  rounds         — all previous rounds [{userMessage, aiResponse, priceOffered}]
 * @param {String} userMessage    — latest message from user
 * @param {Number} currentRound   — which round is this (1-based)
 * @param {Number} maxRounds      — max rounds allowed
 *
 * @returns {{ message: string, currentOffer: number }}
 */




const getAIResponse = async ({
  product,
  rounds,
  userMessage,
  currentRound,
  maxRounds,
}) => {
  // Build conversation history for context
  const messages = [];
 
  // Add previous rounds as conversation history
  for (const round of rounds) {
    messages.push({ role: "user", content: round.userMessage });
    messages.push({ role: "assistant", content: JSON.stringify({ message: round.aiResponse, currentOffer: round.priceOffered }) });
  }
 
  // Add current user message
  messages.push({ role: "user", content: userMessage });
 
  const systemPrompt = buildSystemPrompt({ product, currentRound, maxRounds });
 
  const response = await groq.chat.completions.create({
    model: MODEL,
    temperature: 0.7,       // some creativity but not chaotic
    max_tokens: 300,        // responses should be short
    messages: [
      { role: "system", content: systemPrompt },
      ...messages,
    ],
  });
 
  const rawText = response.choices?.[0]?.message?.content;
 
  if (!rawText) {
    throw new AppError("No response received from AI", 502);
  }
 
  const fallbackPrice =
    rounds.length > 0 ? rounds[rounds.length - 1].priceOffered : product.listedPrice;
 
  return parseAIResponse(rawText, fallbackPrice);
};
 
export default getAIResponse;









/**
 * STREAMING VERSION — SSE ke liye
 * Groq chunks ek ek karke aate hain, hum unhe response mein push karte rehte hain
 *
 * @param {Object} product
 * @param {Array}  rounds
 * @param {String} userMessage
 * @param {Number} currentRound
 * @param {Number} maxRounds
 * @param {Object} res          — Express response object (SSE ke liye)
 *
 * @returns {{ fullMessage: string, currentOffer: number }}
 */
const getAIResponseStream = async ({
  product,
  rounds,
  userMessage,
  currentRound,
  maxRounds,
  res,
}) => {
  const messages = [];

  for (const round of rounds) {
    messages.push({ role: "user", content: round.userMessage });
    messages.push({
      role: "assistant",
      content: JSON.stringify({
        message: round.aiResponse,
        currentOffer: round.priceOffered,
      }),
    });
  }

  messages.push({ role: "user", content: userMessage });

  const systemPrompt = buildSystemPrompt({ product, currentRound, maxRounds });

  // SSE headers set karo
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  // Groq streaming call
  const stream = await groq.chat.completions.create({
    model: MODEL,
    temperature: 0.7,
    max_tokens: 300,
    stream: true, // 👈 ye line streaming on karti hai
    messages: [{ role: "system", content: systemPrompt }, ...messages],
  });

  let fullText = "";

  // Har chunk aate hi frontend ko bhejo
  for await (const chunk of stream) {
    const token = chunk.choices?.[0]?.delta?.content || "";
    if (token) {
      fullText += token;
      // SSE format: "data: <content>\n\n"
      res.write(`data: ${JSON.stringify({ token })}\n\n`);
    }
  }

  // Stream khatam — ab full response parse karo
  const fallbackPrice =
    rounds.length > 0
      ? rounds[rounds.length - 1].priceOffered
      : product.listedPrice;

  const parsed = parseAIResponse(fullText, fallbackPrice);

  // Frontend ko signal karo ki stream khatam ho gayi
  res.write(
    `data: ${JSON.stringify({ done: true, currentOffer: parsed.currentOffer })}\n\n`
  );
  res.end();

  return parsed;
};

export { getAIResponseStream };