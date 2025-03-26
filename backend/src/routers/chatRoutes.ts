import express from "express";
import { ChatController } from "../controller/chatController";

const router = express.Router();

router.post("/conversation", ChatController.createConversation);
router.post("/message", ChatController.sendMessage);
router.get("/messages/:conversation_id", ChatController.getMessages);
router.patch("/message/read/:message_id", ChatController.markMessageAsRead);
router.get("/conversations/:user_id", ChatController.getConversations)// ✅ Add this route


export default router;
