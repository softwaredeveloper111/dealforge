import { body , param } from "express-validator";
import { validateErrorHandler } from "./auth.validator.js";

export const createProductValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 4, max: 100 })
    .withMessage("Product name must be between 4 and 100 characters"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Product description is required")
    .isLength({ min: 4, max: 500 })
    .withMessage("Description must be between 4 and 500 characters"),

  body("imageUrl")
    .trim()
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Image URL must be a valid URL"),

  body("listedPrice")
    .notEmpty()
    .withMessage("Listed price is required")
    .isFloat({ min: 1 })
    .withMessage("Listed price must be greater than 0"),

  body("minimumPrice")
    .notEmpty()
    .withMessage("Minimum price is required")
    .isFloat({ min: 1 })
    .withMessage("Minimum price must be greater than 0"),

  body("targetPrice")
    .notEmpty()
    .withMessage("Target price is required")
    .isFloat({ min: 1 })
    .withMessage("Target price must be greater than 0"),

  body("aiPersonality")
    .notEmpty()
    .withMessage("AI personality is required")
    .isIn(["firm", "friendly", "tactical"])
    .withMessage("AI personality must be firm, friendly, or tactical"),

  body("isActive")
    .optional()
    .isBoolean()
    .withMessage("isActive must be a boolean"),

  // Price hierarchy validation
  body()
    .custom((value) => {
      const { listedPrice, targetPrice, minimumPrice } = value;

      if (minimumPrice >= targetPrice) {
        throw new Error("minimumPrice must be less than targetPrice");
      }

      if (targetPrice >= listedPrice) {
        throw new Error("targetPrice must be less than listedPrice");
      }

      return true;
    }),

  validateErrorHandler,
];





export const getSingleProductValidation = [
  param("id")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Product ID must be a valid MongoDB ObjectId"),

  validateErrorHandler,
];