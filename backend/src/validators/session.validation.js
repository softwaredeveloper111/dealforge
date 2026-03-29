

import { body, param } from "express-validator";
import { validateErrorHandler } from "./auth.validator.js";




export const sessionProductIdValidation = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Product ID must be a valid MongoDB ObjectId"),

  validateErrorHandler,
];




export const sessionSendUserMessageValidation = [

  param("id")
    .notEmpty()
    .withMessage("Session ID is required")
    .isMongoId()
    .withMessage("Session ID must be a valid MongoDB ObjectId"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 1, max: 700 })
    .withMessage("Message must be between 1 and 700 characters"),


    validateErrorHandler

]




export const ParamMongoIdValidation =  [

  param("id")
    .notEmpty()
    .withMessage("Session ID is required")
    .isMongoId()
    .withMessage("Session ID must be a valid MongoDB ObjectId"),


    validateErrorHandler

]