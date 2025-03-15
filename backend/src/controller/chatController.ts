import { Request, Response } from "express";
import { ChatService } from "../services/chatService";

export class ChatController {
    static async createConversation(req: Request, res: Response) {
        try {
            const { client_id, freelancer_id } = req.body;
            const conversation_id = await ChatService.createConversation(client_id, freelancer_id);
            res.json({ conversation_id });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    static async sendMessage(req: Request, res: Response) {
        try {
            const { conversation_id, sender_id, message_text } = req.body;
            const response = await ChatService.sendMessage(conversation_id, sender_id, message_text);
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    static async getMessages(req: Request, res: Response) {
        try {
            const { conversation_id } = req.params;
            const messages = await ChatService.getMessages(Number(conversation_id));
            res.json(messages);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    static async markMessageAsRead(req: Request, res: Response) {
        try {
            const { message_id } = req.params;
            const response = await ChatService.markMessageAsRead(Number(message_id));
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
