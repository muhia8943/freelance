import { poolPromise,  } from "../config/sql.config";
import * as sql from 'mssql';


export interface Message {
    id: number;
    sender_id: number;
    message_text: string;
    sent_at: Date;
    is_read: boolean;
    sender_name: string;
}

export class ChatService {
    static async createConversation(client_id: number, freelancer_id: number): Promise<number> {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("client_id", sql.Int, client_id)
                .input("freelancer_id", sql.Int, freelancer_id)
                .query(`SELECT id FROM Conversations 
                        WHERE (client_id = @client_id AND freelancer_id = @freelancer_id) 
                        OR (client_id = @freelancer_id AND freelancer_id = @client_id)`);
            
            if (result.recordset.length > 0) {
                return result.recordset[0].id;
            }

            const insertResult = await pool.request()
                .input("client_id", sql.Int, client_id)
                .input("freelancer_id", sql.Int, freelancer_id)
                .query(`INSERT INTO Conversations (client_id, freelancer_id) 
                        OUTPUT INSERTED.id VALUES (@client_id, @freelancer_id)`);
            
            return insertResult.recordset[0].id;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    static async sendMessage(conversation_id: number, sender_id: number, message_text: string): Promise<{ message: string }> {
        try {
            const pool = await poolPromise;
            await pool.request()
                .input("conversation_id", sql.Int, conversation_id)
                .input("sender_id", sql.Int, sender_id)
                .input("message_text", sql.NVarChar, message_text)
                .query(`INSERT INTO Messages (conversation_id, sender_id, message_text) 
                        VALUES (@conversation_id, @sender_id, @message_text)`);
            
            return { message: "Message sent" };
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    static async getMessages(conversation_id: number): Promise<Message[]> {
        try {
            const pool = await poolPromise;
            const result = await pool.request()
                .input("conversation_id", sql.Int, conversation_id)
                .query(`SELECT m.id, m.sender_id, m.message_text, m.sent_at, m.is_read, 
                               u.username AS sender_name 
                        FROM Messages m
                        JOIN Users u ON m.sender_id = u.UserID
                        WHERE m.conversation_id = @conversation_id 
                        ORDER BY m.sent_at ASC`);
            
            return result.recordset as Message[];
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    static async markMessageAsRead(message_id: number): Promise<{ message: string }> {
        try {
            const pool = await poolPromise;
            await pool.request()
                .input("message_id", sql.Int, message_id)
                .query(`UPDATE Messages SET is_read = 1 WHERE id = @message_id`);

            return { message: "Message marked as read" };
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}
