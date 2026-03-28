import leaderBoardEntryModel from "../models/LeaderBoardEntry.model.js";
import AppError from "../utils/AppError.js";

const TOP_LIMIT = 50;

/**
 * SERVICE 1 — Top 50 global leaderboard
 * Rank dynamically calculate hota hai — DB mein store nahi
 * Sort: discountPercent DESC (jitna zyada discount, utna upar)
 */
const getGlobalLeaderboard = async () => {
  const entries = await leaderBoardEntryModel
    .find()
    .sort({ discountPercent: -1, achievedAt: 1 }) // same discount pe pehle achieve karne wala upar
    .limit(TOP_LIMIT)
    .populate("userId", "username")
    .populate("productId", "name listedPrice");

  // Rank dynamically assign karo
  const leaderboard = entries.map((entry, index) => ({
    rank: index + 1,
    username: entry.userId?.username || "Unknown",
    product: entry.productId?.name || "Unknown",
    listedPrice: entry.listedPrice,
    finalPrice: entry.finalPrice,
    discountPercent: entry.discountPercent,
    achievedAt: entry.achievedAt,
  }));

  return leaderboard;
};

/**
 * SERVICE 2 — User ki apni rank
 * Uski best entry dhundho, phir count karo kitne usse upar hain
 */
const getUserRank = async ({ userId }) => {
  // User ki best entry (highest discount)
  const userBestEntry = await leaderBoardEntryModel
    .findOne({ userId })
    .sort({ discountPercent: -1 });

  if (!userBestEntry) {
    throw new AppError("You have not completed any deals yet.", 404);
  }

  // Kitne entries usse better hain
  const betterCount = await leaderBoardEntryModel.countDocuments({
    discountPercent: { $gt: userBestEntry.discountPercent },
  });

  const userRank = betterCount + 1;

  return {
    rank: userRank,
    discountPercent: userBestEntry.discountPercent,
    finalPrice: userBestEntry.finalPrice,
    listedPrice: userBestEntry.listedPrice,
  };
};

export { getGlobalLeaderboard, getUserRank };