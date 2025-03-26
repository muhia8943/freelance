"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.ChatService = void 0;
const sql_config_1 = require("../config/sql.config");
const sql = __importStar(require("mssql"));
class ChatService {
    static createConversation(client_id, freelancer_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield sql_config_1.poolPromise;
                const result = yield pool.request()
                    .input("client_id", sql.Int, client_id)
                    .input("freelancer_id", sql.Int, freelancer_id)
                    .query(`SELECT id FROM Conversations 
                        WHERE (client_id = @client_id AND freelancer_id = @freelancer_id) 
                        OR (client_id = @freelancer_id AND freelancer_id = @client_id)`);
                if (result.recordset.length > 0) {
                    return result.recordset[0].id;
                }
                const insertResult = yield pool.request()
                    .input("client_id", sql.Int, client_id)
                    .input("freelancer_id", sql.Int, freelancer_id)
                    .query(`INSERT INTO Conversations (client_id, freelancer_id) 
                        OUTPUT INSERTED.id VALUES (@client_id, @freelancer_id)`);
                return insertResult.recordset[0].id;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static sendMessage(conversation_id, sender_id, message_text) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield sql_config_1.poolPromise;
                yield pool.request()
                    .input("conversation_id", sql.Int, conversation_id)
                    .input("sender_id", sql.Int, sender_id)
                    .input("message_text", sql.NVarChar, message_text)
                    .query(`INSERT INTO Messages (conversation_id, sender_id, message_text) 
                        VALUES (@conversation_id, @sender_id, @message_text)`);
                return { message: "Message sent" };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getMessages(conversation_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield sql_config_1.poolPromise;
                const result = yield pool.request()
                    .input("conversation_id", sql.Int, conversation_id)
                    .query(`SELECT m.id, m.sender_id, m.message_text, m.sent_at, m.is_read, 
                               u.username AS sender_name 
                        FROM Messages m
                        JOIN Users u ON m.sender_id = u.UserID
                        WHERE m.conversation_id = @conversation_id 
                        ORDER BY m.sent_at ASC`);
                return result.recordset;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static markMessageAsRead(message_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield sql_config_1.poolPromise;
                yield pool.request()
                    .input("message_id", sql.Int, message_id)
                    .query(`UPDATE Messages SET is_read = 1 WHERE id = @message_id`);
                return { message: "Message marked as read" };
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
    static getConversations(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pool = yield sql_config_1.poolPromise;
                const result = yield pool.request()
                    .input("user_id", sql.Int, user_id)
                    .query(`
                    SELECT c.id AS conversation_id, 
                           CASE 
                               WHEN c.client_id = @user_id THEN u_freelancer.Username 
                               ELSE u_client.Username 
                           END AS freelancerName,
                           CASE 
                               WHEN c.client_id = @user_id THEN u_freelancer.profile_picture 
                               ELSE u_client.profile_picture 
                           END AS freelancerProfilePicture,
                           (SELECT TOP 1 m.message_text 
                            FROM Messages m 
                            WHERE m.conversation_id = c.id 
                            ORDER BY m.sent_at DESC) AS lastMessage
                    FROM Conversations c
                    JOIN Users u_client ON c.client_id = u_client.UserID
                    JOIN Users u_freelancer ON c.freelancer_id = u_freelancer.UserID
                    WHERE c.client_id = @user_id OR c.freelancer_id = @user_id
                `);
                return result.recordset;
            }
            catch (error) {
                throw new Error(error.message);
            }
        });
    }
}
exports.ChatService = ChatService;
