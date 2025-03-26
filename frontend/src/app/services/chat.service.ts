import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://localhost:3000/api/chat';

  constructor(private http: HttpClient) {}

  createConversation(clientId: number, freelancerId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/conversation`, { client_id: clientId, freelancer_id: freelancerId });
  }
  sendMessage(messageData: any): Observable<any> {
    return this.http.post("http://localhost:3000/api/chat/message", messageData);
}


  getMessages(conversation_id: number): Observable<any> {
    return this.http.get(`http://localhost:3000/api/chat/messages/${conversation_id}`);
}

  getConversations(clientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/conversations/${clientId}`);
  }

  getConversationById(conversationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/conversation/${conversationId}`);
  }
}
