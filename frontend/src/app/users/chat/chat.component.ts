import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserChatService } from '../../services/userservices/user-chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  imports: [RouterLink,CommonModule, FormsModule]
})
export class ChatComponent implements OnInit {
  conversations: any[] = [];
  messages: any[] = [];
  selectedConversation: any = null;
  newMessage: string = '';
  userId: number | null = null; // Store logged-in user ID

  constructor(private chatService: UserChatService) {}

  ngOnInit(): void {
    this.getUserId();
    this.loadConversations();
  }

  // ✅ Fetch User ID from Local Storage
  getUserId(): void {
    const storedUserId = localStorage.getItem('UserID');
    if (storedUserId) {
      this.userId = Number(storedUserId);
    } else {
      console.error('User ID is missing. Please log in.');
    }
  }

  // ✅ Load User Conversations
  loadConversations(): void {
    if (!this.userId) return;

    this.chatService.getConversations(this.userId).subscribe(
      (data) => {
        this.conversations = data;
      },
      (error) => {
        console.error('Error fetching conversations:', error);
      }
    );
  }

  // ✅ Select a Conversation and Load Messages
  selectConversation(conversation: any) {
    this.selectedConversation = conversation;
    this.loadMessages(conversation.conversation_id);
  }

  // ✅ Load Messages for Selected Chat
  loadMessages(conversationId: number) {
    this.chatService.getMessages(conversationId).subscribe(
      (messages) => {
        this.messages = messages;
      },
      (error) => {
        console.error('Error fetching messages:', error);
      }
    );
  }

  // ✅ Send a Message
  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedConversation || this.userId === null) return;
  
    const messageData = {
      conversation_id: this.selectedConversation.conversation_id,
      sender_id: this.userId, // Guaranteed to be a number
      message_text: this.newMessage
    };
  
    this.chatService.sendMessage(messageData).subscribe(
      () => {
        this.messages.push({
          sender_id: this.userId,
          message_text: this.newMessage
        });
        this.newMessage = ''; // Clear input field
      },
      (error) => {
        console.error('Error sending message:', error);
      }
    );
  }
  
}
