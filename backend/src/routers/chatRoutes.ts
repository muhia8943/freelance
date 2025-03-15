import express from "express";
import { ChatController } from "../controller/chatController";

const router = express.Router();

router.post("/conversation", ChatController.createConversation);
router.post("/message", ChatController.sendMessage);
router.get("/messages/:conversation_id", ChatController.getMessages);
router.patch("/message/read/:message_id", ChatController.markMessageAsRead);

export default router;
