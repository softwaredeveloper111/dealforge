import mongoose from "mongoose";

const leaderBoardEntrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: [true, "Session ID is required"],
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },

    finalPrice: {
      type: Number,
      required: [true, "Final price is required"],
    },

    listedPrice: {
      type: Number,
      required: [true, "Listed price is required"],
    },

    /** (listedPrice - finalPrice) / listedPrice * 100 */
    discountPercent: {
      type: Number,
      required: [true, "Discount percent is required"],
    },

    /** rank field intentionally removed — dynamically calculated at query time */

    achievedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const leaderBoardEntryModel = mongoose.model(
  "LeaderBoardEntry",
  leaderBoardEntrySchema
);

export default leaderBoardEntryModel;