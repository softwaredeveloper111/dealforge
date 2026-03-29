import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/AppError.js";
import sessionModel from "../models/session.model.js";
import {startSession ,processMessage , acceptDeal ,abandonSession , getSessionById , getUserSessions , processMessageStream } from "../services/negotiation.service.js"



export const startSessionController = asyncHandler(async(req,res)=>{


  const productId = req.body.productId;
  const userId = req.user.id;
  
  const session = await startSession(
    userId,
    productId,
  );

  
  res.status(201).json({
    success:true,
    message:"session started successfully",
    data:session
  })

})




export const userSendMessageController = asyncHandler(async(req,res)=>{

  const userId = req.user.id;
  const sessionId = req.params.id;
  const message = req.body.message;

  
  const AIresponse = await processMessage(sessionId,userId,message);

  res.status(200).json({
    success:true,
    message:"message sent successfully",
    data:AIresponse
  })

})




export const acceptDealController = asyncHandler(async(req,res)=>{

  const userId = req.user.id;
  const sessionId = req.params.id;
  
  const result = await acceptDeal(sessionId,userId);
  
  res.status(200).json({
    success:true,
    message:'deal accepted successfully',
    data:result
  })

})






export const abandonDealController = asyncHandler(async(req,res)=>{

  const userId = req.user.id;
  const sessionId = req.params.id

  const result = await abandonSession(sessionId,userId);

  res.status(200).json({
    success:true,
    message:'session abandoned successfully',
    data:result
  })

})







export const getSessionByIdController = asyncHandler(async(req,res)=>{

  const userId = req.user.id;
  const sessionId = req.params.id;
  

  const result = await  getSessionById(sessionId,userId);
  
  res.status(200).json({
    success:true,
    message:"session details fetched successfully",
    data:result
  })

})






export const getAllSessionController = asyncHandler(async(req,res)=>{
  const userId = req.user.id;
  const result = await getUserSessions(userId);

  res.status(200).json({
    success:true,
    message:"user all session fetch sucessfully",
    data:result
  })

});







export const userSendMessageStreamController = async (req, res) => {
  // asyncHandler USE MAT KARO — SSE mein error differently handle hota hai
  try {
    const userId = req.user.id;
    const sessionId = req.params.id;
    const userMessage = req.body.message;
 
    await processMessageStream({ sessionId, userId, userMessage, res });
  } catch (error) {
    // Agar SSE shuru hone se pehle error aaya
    if (!res.headersSent) {
      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Something went wrong",
      });
    } else {
      // SSE already shuru ho gayi thi — error event bhejo
      res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
      res.end();
    }
  }
};