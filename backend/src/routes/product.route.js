import {Router} from "express";
import identifyingUser from "../middlewares/auth.middleware.js";
import {createProductController , getAllProductController , getSingleProductController ,} from "../controllers/product.controller.js"
import {createProductValidation ,getSingleProductValidation} from "../validators/product.validation.js"




const productRouter = Router()







/**
 * @method POST
 * @route /api/products
 * @description Create a new product
 * @body  {name, description, imageUrl, listedPrice, minimumPrice,targetPrice,aiPersonality,isActive}
 * 
 */
productRouter.post("/" , identifyingUser,  createProductValidation  , createProductController )




/** 
 * @method   GET
 * @route     /api/products
 * @description Get all products
 */
productRouter.get("/", identifyingUser , getAllProductController )





/**
 * @method   GET
 * @route    /api/products/:id
 * @description get a single product details
 */
productRouter.get('/:id' , identifyingUser , getSingleProductValidation  , getSingleProductController)















export default productRouter