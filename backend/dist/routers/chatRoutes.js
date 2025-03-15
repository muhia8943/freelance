"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chatController_1 = require("../controller/chatController");
const router = express_1.default.Router();
router.post("/conversation", chatController_1.ChatController.createConversation);
router.post("/message", chatController_1.ChatController.sendMessage);
router.get("/messages/:conversation_id", chatController_1.ChatController.getMessages);
router.patch("/message/read/:message_id", chatController_1.ChatController.markMessageAsRead);
exports.default = router;
