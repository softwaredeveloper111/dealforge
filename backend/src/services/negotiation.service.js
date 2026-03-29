import sessionModel from "../models/session.model.js";
import productModel from "../models/product.model.js";
import leaderBoardEntryModel from "../models/LeaderBoardEntry.model.js";
import userModel from "../models/user.model.js";
import getAIResponse , { getAIResponseStream } from "./ai.service.js";
import AppError from "../utils/AppError.js";
import { buildScoreSummary } from "./scoring.service.js";




/**
 * SERVICE 1 — Start a new negotiation session
 * Ek user ek product pe sirf ek active session allowed hai
 */
const startSession = async ( userId, productId ) => {
  // Product fetch karo — secret fields bhi chahiye (select:false override)
  const product = await productModel
    .findOne({ _id: productId, isActive: true })
    .select("+minimumPrice +targetPrice");

  if (!product) {
    throw new AppError("Product not found or inactive", 404);
  }

  // Check karo koi active session already hai is product pe
  const existingSession = await sessionModel.findOne({
    userId,
    productId,
    status: "active",
  });

  if (existingSession) {
    throw new AppError(
      "You already have an active session for this product. Complete or abandon it first.",
      409
    );
  }

  // Naya session banao
  const session = await sessionModel.create({
    userId,
    productId,
    initialPrice: product.listedPrice,
    currentPrice: product.listedPrice, // starts at listed price
    status: "active",
    dealStatus: "pending",
    rounds: [],
    startedAt: Date.now(),
  });

  return session;
};

/**
 * SERVICE 2 — Process user message and get AI response
 * Heart of the negotiation game
 */
const processMessage = async ( sessionId, userId, userMessage ) => {
  // Session fetch karo

  const session = await sessionModel.findOne({ _id: sessionId, userId });

  if (!session) {
    throw new AppError("Session not found", 404);
  }

  if (session.status !== "active") {
    throw new AppError(
      `This session is already ${session.status}. Start a new session to negotiate.`,
      400
    );
  }

  const currentRound = session.rounds.length + 1;

  // Max rounds check
  if (currentRound > session.maxRounds) {
    throw new AppError(
      "Maximum rounds reached. Please accept the deal or walk away.",
      400
    );
  }

  // Product fetch — secret fields chahiye AI ke liye
  const product = await productModel
    .findById(session.productId)
    .select("+minimumPrice +targetPrice");

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  // AI se response lo
  const aiResult = await getAIResponse({
    product,
    rounds: session.rounds,
    userMessage,
    currentRound,
    maxRounds: session.maxRounds,
  });

  // AI ka offer minimumPrice se niche nahi ja sakta — hard enforcement
  const safeOffer = Math.max(aiResult.currentOffer, product.minimumPrice);

  // Naya round banao
  const newRound = {
    roundNumber: currentRound,
    userMessage,
    aiResponse: aiResult.message,
    priceOffered: safeOffer,
    timestamp: Date.now(),
  };

  // Session update karo
  session.rounds.push(newRound);
  session.currentPrice = safeOffer;

  // Agar last round hai toh session auto-complete (no_deal)
  if (currentRound === session.maxRounds) {
    session.status = "completed";
    session.dealStatus = "no_deal";
    session.completedAt = Date.now();
  }

  await session.save();

  return {
    round: newRound,
    currentPrice: safeOffer,
    roundsLeft: session.maxRounds - currentRound,
    sessionStatus: session.status,
    dealStatus: session.dealStatus,
  };
};

/**
 * SERVICE 3 — Accept the current deal
 * Final price lock, leaderboard entry, user stats update
 */
const acceptDeal = async ( sessionId, userId ) => {
  const session = await sessionModel.findOne({ _id: sessionId, userId });

  if (!session) {
    throw new AppError("Session not found", 404);
  }

  if (session.status !== "active") {
    throw new AppError(`Session is already ${session.status}`, 400);
  }

  if (session.rounds.length === 0) {
    throw new AppError(
      "You must negotiate at least one round before accepting.",
      400
    );
  }

  // Session complete karo
  session.status = "completed";
  session.dealStatus = "deal";
  session.finalPrice = session.currentPrice;
  session.completedAt = Date.now();
  await session.save();

  // Discount calculate karo
  const discountPercent =
    ((session.initialPrice - session.finalPrice) / session.initialPrice) * 100;

  // Leaderboard entry banao
  await leaderBoardEntryModel.create({
    userId,
    sessionId: session._id,
    productId: session.productId,
    finalPrice: session.finalPrice,
    listedPrice: session.initialPrice,
    discountPercent: parseFloat(discountPercent.toFixed(2)),
    achievedAt: Date.now(),
  });

  // User stats update karo
  const user = await userModel.findById(userId);
  user.totalSessions += 1;

  // bestScore update karo agar ye deal better hai
  if (user.bestScore === null || discountPercent > user.bestScore) {
    user.bestScore = parseFloat(discountPercent.toFixed(2));
  }

  await user.save();

  const summary = buildScoreSummary({
  listedPrice: session.initialPrice,
  finalPrice: session.finalPrice,
  rounds: session.rounds.length,
});
return summary;
};

/**
 * SERVICE 4 — Abandon session (walk away)
 */
const abandonSession = async (sessionId, userId ) => {
  const session = await sessionModel.findOne({ _id: sessionId, userId });

  if (!session) {
    throw new AppError("Session not found", 404);
  }

  if (session.status !== "active") {
    throw new AppError(`Session is already ${session.status}`, 400);
  }

  session.status = "abandoned";
  session.dealStatus = "no_deal";
  session.completedAt = Date.now();
  await session.save();

  // totalSessions count update
  await userModel.findByIdAndUpdate(userId, { $inc: { totalSessions: 1 } });

  return {
    message: "You walked away. Better luck next time!",
  };
};

/**
 * SERVICE 5 — Get session by ID (for frontend state restore)
 */
const getSessionById = async ( sessionId, userId ) => {
  const session = await sessionModel
    .findOne({ _id: sessionId, userId })
    .populate("productId", "-minimumPrice -targetPrice"); // secret fields hide

  if (!session) {
    throw new AppError("Session not found", 404);
  }

  return session;
};

/**
 * SERVICE 6 — Get all sessions of a user
 */
const getUserSessions = async ( userId ) => {
  const sessions = await sessionModel
    .find({ userId })
    .populate("productId", "-minimumPrice -targetPrice")
    .sort({ createdAt: -1 });

  return sessions;
};


/**
 * SERVICE — Stream version of processMessage
 * SSE ke liye — AI response token by token bhejta hai
 */
const processMessageStream = async ({ sessionId, userId, userMessage, res }) => {
  const session = await sessionModel.findOne({ _id: sessionId, userId });
 
  if (!session) {
    throw new AppError("Session not found", 404);
  }
 
  if (session.status !== "active") {
    throw new AppError(
      `This session is already ${session.status}. Start a new session to negotiate.`,
      400
    );
  }
 
  const currentRound = session.rounds.length + 1;
 
  if (currentRound > session.maxRounds) {
    throw new AppError(
      "Maximum rounds reached. Please accept the deal or walk away.",
      400
    );
  }
 
  const product = await productModel
    .findById(session.productId)
    .select("+minimumPrice +targetPrice");
 
  if (!product) {
    throw new AppError("Product not found", 404);
  }
 
  // Streaming AI call — res directly pass ho raha hai
  const aiResult = await getAIResponseStream({
    product,
    rounds: session.rounds,
    userMessage,
    currentRound,
    maxRounds: session.maxRounds,
    res, // 👈 SSE response object
  });
 
  // Hard enforcement — minimumPrice se niche nahi jaayega
  const safeOffer = Math.max(aiResult.currentOffer, product.minimumPrice);
 
  const newRound = {
    roundNumber: currentRound,
    userMessage,
    aiResponse: aiResult.message,
    priceOffered: safeOffer,
    timestamp: Date.now(),
  };
 
  session.rounds.push(newRound);
  session.currentPrice = safeOffer;
 
  if (currentRound === session.maxRounds) {
    session.status = "completed";
    session.dealStatus = "no_deal";
    session.completedAt = Date.now();
  }
 
  await session.save();
};
 



export {
  startSession,
  processMessage,
  acceptDeal,
  abandonSession,
  getSessionById,
  getUserSessions,
  processMessageStream,
};