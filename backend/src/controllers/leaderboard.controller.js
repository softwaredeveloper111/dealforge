import asyncHandler from "../middlewares/asyncHandler.js";
import AppError from "../utils/AppError.js";
import {getGlobalLeaderboard , getUserRank} from "../services/leaderboard.service.js"




export const getGlobalLeaderboardController = asyncHandler(async(req,res)=>{

 const result = await getGlobalLeaderboard();

 res.status(200).json({
  success:true,
  message:"leaderboard fetched successfully",
  data:result
 })

})





export const getMyRankController = asyncHandler(async(req,res)=>{

  const userId = req.user.id;
  const result = await getUserRank(userId);
  res.status(200).json({
    success:true,
    message:"rank fetch sucessfully",
    data:result
  })

})