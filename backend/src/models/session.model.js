import mongoose from "mongoose";

const roundSchema = new mongoose.Schema(
  {
    roundNumber: {
      type: Number,
      required: [true,"round number is required"],
    },
    userMessage: {
      type: String,
      required: [true,'user message is required'],
    },
    aiResponse: {
      type: String,
      required: [true,'ai response is required'], 
    },
    /** AI ne is round mein kya price offer kiya */
    priceOffered: {
      type: Number,
      required: [true,'price offered is required'],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // har round ka alag _id nahi chahiye
);

const sessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },

    status: {
      type: String,
      enum: {
        values: ["active", "completed", "abandoned"],
        message: "Status must be active, completed, or abandoned",
      },
      default: "active",
    },

    /** Latest price jo AI ne offer kiya */
    currentPrice: {
      type: Number,
    },

    /** listedPrice at the time session started — for reference */
    initialPrice: {
      type: Number,
      required: [true, "Initial price is required"],
    },

    rounds: [roundSchema],

    maxRounds: {
      type: Number,
      default: 10,
    },

    /** null jab tak deal confirm na ho */
    finalPrice: {
      type: Number,
      default: null,
    },

    dealStatus: {
      type: String,
      enum: {
        values: ["pending", "deal", "no_deal"],
        message: "Deal status must be pending, deal, or no_deal",
      },
      default: "pending",
    },

    startedAt: {
      type: Date,
      default: Date.now,
    },

    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const sessionModel = mongoose.model("Session", sessionSchema);

export default sessionModel;