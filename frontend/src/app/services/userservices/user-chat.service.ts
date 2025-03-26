import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserChatService {  // ✅ Renamed & Expanded
  private apiUrl = 'http://localhost:3000/api/chat';

  constructor(private http: HttpClient) {}

  // ✅ Create a conversation between client & freelancer
  createConversation(clientId: number, freelancerId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/conversation`, {
      client_id: clientId,
      freelancer_id: freelancerId
    });
  }

  // ✅ Get all conversations for a specific user
  getConversations(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conversations/${userId}`);
  }

  // ✅ Get messages for a specific conversation
  getMessages(conversationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/messages/${conversationId}`);
  }

  // ✅ Send a new message
  sendMessage(messageData: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/chat/message", messageData);
}
}
