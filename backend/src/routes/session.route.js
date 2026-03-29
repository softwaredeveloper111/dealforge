import {Router} from "express";
import {
  startSessionController ,
  userSendMessageController , 
  acceptDealController ,
  abandonDealController , 
  getSessionByIdController , 
  getAllSessionController,
  userSendMessageStreamController
 }
   from "../controllers/session.controller.js"
import identifyingUser from "../middlewares/auth.middleware.js"
import {
  sessionProductIdValidation ,
  sessionSendUserMessageValidation ,
  ParamMongoIdValidation} 
  from "../validators/session.validation.js"






const sessionRouter = Router();






/**
 * @method  post
 * @route   /api/sessions/start
 * @description Start a new negotiation session
 * @body     - productId 
 */

sessionRouter.post("/start" , identifyingUser , sessionProductIdValidation ,  startSessionController)







/**
 * @method   GET
 * @route   api/sessions/my
 * @description   user ke sare sessions fetch karo, dashboard ke liye
 */

sessionRouter.get("/my" , identifyingUser , getAllSessionController)









/**
 * @method  POST
 * @route    /api/sessions/:id/message
 * @description  user ka message vejo, ai ka response milega -ye sabse zyada call hone wala route hai.
 * @body   - message    
 * @params -  id
 */

sessionRouter.post("/:id/message" , identifyingUser ,sessionSendUserMessageValidation, userSendMessageController)







/**
 * @method  POST
 * @route    /api/sessions/id/message/stream
 * @description   User ka message AI ko bhejo, AI response stream me milega. Ye route real-time negotiation ke liye hai.
 * @params   - id
 */

sessionRouter.post("/:id/message/stream", identifyingUser, sessionSendUserMessageValidation, userSendMessageStreamController);








/**
 * @method    POST
 * @route      /api/sessions/:id/accept
 * @description    User ne "Accept Deal" button dabaya.
 * @params   - id
 */

sessionRouter.post("/:id/accept" , identifyingUser , ParamMongoIdValidation , acceptDealController)









/**
 * @method  POST
 * @route   /api/sessions/:id/abandon
 * @description   user walk away, reject the deal of the AI Seller
 * @params   -id
 * 
 */

sessionRouter.post("/:id/abandon" , identifyingUser , ParamMongoIdValidation , abandonDealController)










/**
 * @method    GET
 * @route    /api/sessions/id
 * @description   Page refresh hone pe frontend session restore karta hai.
 * @params   - id
 */

sessionRouter.get("/:id" , identifyingUser , ParamMongoIdValidation , getSessionByIdController)
















export default sessionRouter