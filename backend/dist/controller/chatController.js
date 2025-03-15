"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const chatService_1 = require("../services/chatService");
class ChatController {
    static createConversation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { client_id, freelancer_id } = req.body;
                const conversation_id = yield chatService_1.ChatService.createConversation(client_id, freelancer_id);
                res.json({ conversation_id });
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static sendMessage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { conversation_id, sender_id, message_text } = req.body;
                const response = yield chatService_1.ChatService.sendMessage(conversation_id, sender_id, message_text);
                res.json(response);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static getMessages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { conversation_id } = req.params;
                const messages = yield chatService_1.ChatService.getMessages(Number(conversation_id));
                res.json(messages);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
    static markMessageAsRead(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message_id } = req.params;
                const response = yield chatService_1.ChatService.markMessageAsRead(Number(message_id));
                res.json(response);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.ChatController = ChatController;
