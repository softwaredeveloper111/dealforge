import {Router} from "express"
import identifyUser from "../middlewares/auth.middleware.js";
import {getGlobalLeaderboardController , getMyRankController} from "../controllers/leaderboard.controller.js";






const leaderboardRouter = Router();






/**
 * @methods    GET
 * @route      /api/leaderboard
 * @description  Get top 50 users sorted by bestScore in descending order
 */

leaderboardRouter.get("/", identifyUser, getGlobalLeaderboardController )



/**
 * @methods     GET
 * @route     /api/leaderboard/my-rank
 * @description    Get logged-in user's rank based on their bestScore compared to others
 */

leaderboardRouter.get("/my-rank", identifyUser, getMyRankController)













export default leaderboardRouter;