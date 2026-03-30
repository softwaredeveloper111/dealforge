import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/AppError.js";
import productModel from "../models/product.model.js";






export const createProductController = asyncHandler(async(req,res)=>{
  const product = await productModel.create(req.body);
  res.status(201).json({
    success:true,
    message:"product created successfully",
    data:product
  })
})



export const getAllProductController = asyncHandler(async(req,res)=>{
 
    const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6;
  const skip = (page - 1) * limit;

 const products = await productModel
    .find({ isActive: true })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    success:true,
    data:products
  })
})




export const getSingleProductController = asyncHandler(async(req,res)=>{
  const product = await productModel.findById(req.params.id);
  if(!product){
    throw new AppError("product not found",404)
  }
  res.status(200).json({
    success:true,
    message:"product fetched successfully",
    data:product
  })
})