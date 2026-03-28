import "dotenv/config";
import getAIResponse from "./src/services/ai.service.js";

// Fake product — minimumPrice aur targetPrice bhi chahiye (normally DB se aata)
const mockProduct = {
  name: "Vintage Leather Jacket",
  description: "A premium quality vintage leather jacket from the 90s.",
  listedPrice: 1000,
  minimumPrice: 650,  // secret
  targetPrice: 800,   // secret
  aiPersonality: "tactical",
};

// Fake previous rounds (pehli baar empty rahega)
const mockRounds = [];

// Test karo
const run = async () => {
  try {
    console.log("🚀 Sending message to AI seller...\n");

    const result = await getAIResponse({
      product: mockProduct,
      rounds: mockRounds,
      userMessage: "Bhai 700 mein de do, competitor 750 mein de raha hai",
      currentRound: 1,
      maxRounds: 10,
    });

    console.log("✅ AI Response:");
    console.log("Message     :", result.message);
    console.log("Current Offer:", result.currentOffer);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
};

run();