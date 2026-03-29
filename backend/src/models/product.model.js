import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      minlength: [4, "Product name must be at least 4 characters"],
      maxlength: [100, "Product name must be at most 100 characters"],
    },

    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [4, "Description must be at least 4 characters"],
      maxlength: [500, "Description must be at most 500 characters"],
    },

    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },

    /** User ko dikhta hai — MRP */
    listedPrice: {
      type: Number,
      required: [true, "Listed price is required"],
      min: [1, "Listed price must be greater than 0"],
    },

    /** AI ka hard limit — is se niche kabhi nahi jayega , gaya to loss hoga */
    minimumPrice: {
      type: Number,
      required: [true, "Minimum price is required"],
      min: [1, "Minimum price must be greater than 0"],
      select: false,
    },

    /** AI ka comfortable profit zone */
    targetPrice: {
      type: Number,
      required: [true, "Target price is required"],
      min: [1, "Target price must be greater than 0"],
      select: false,
    },

    
    aiPersonality: {
      type: String,
      required: [true, "AI personality is required"],
      enum: {
        values: ["firm", "friendly", "tactical"],
        message: "AI personality must be firm, friendly, or tactical",
      },
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

/**
 * Price hierarchy validation:
 * listedPrice > targetPrice > minimumPrice
 */
productSchema.pre("validate", function () {
  if (this.minimumPrice >= this.targetPrice) {
    return next(new Error("minimumPrice must be less than targetPrice"));
  }
  if (this.targetPrice >= this.listedPrice) {
    return next(new Error("targetPrice must be less than listedPrice"));
  }

});





/** Never expose secret pricing fields in API responses */
productSchema.methods.toJSON = function () {
  const product = this.toObject();
  delete product.minimumPrice;
  delete product.targetPrice;
  return product;
};



const productModel = mongoose.model("Product", productSchema);

export default productModel;