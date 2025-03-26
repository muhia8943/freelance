import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-clientchat',
  templateUrl: './clientchat.component.html',
  styleUrls: ['./clientchat.component.css'],
  imports:[CommonModule, FormsModule,RouterLink]
})
export class ClientchatComponent implements OnInit {
  conversations: any[] = [];
  messages: any[] = [];
  selectedConversation: any = null;
  newMessage: string = '';
  clientId: number | null = null; // Initialize as null

  constructor(private chatService: ChatService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getClientId();  // ✅ Fetch Client ID before making API calls
    this.loadConversations();
    
    this.route.queryParams.subscribe(params => {
      if (params['conversationId']) {
        this.selectConversationById(params['conversationId']);
      }
    });
  }

  // ✅ Fetch Client ID from Local Storage
  getClientId(): void {
    const storedUserId = localStorage.getItem('UserID');
    if (storedUserId) {
      this.clientId = Number(storedUserId);
      console.log('Client ID retrieved:', this.clientId);
    } else {
      console.error('Client ID is missing. Ensure the user is logged in.');
    }
  }

  loadConversations(): void {
    if (!this.clientId) return;

    this.chatService.getConversations(this.clientId).subscribe(
      (data) => {
        this.conversations = data;
      },
      (error) => {
        console.error('Error fetching conversations:', error);
      }
    );
  }

  selectConversation(conversation: any) {
    this.selectedConversation = conversation;
    this.loadMessages(conversation.conversation_id);  // ✅ Fetch messages when conversation is selected
}


  selectConversationById(conversationId: number): void {
    if (!this.clientId) return;

    this.chatService.getConversationById(conversationId).subscribe(
      (conversation) => {
        this.selectedConversation = conversation;
        this.loadMessages(conversation.id);
      },
      (error) => {
        console.error('Error fetching conversation:', error);
      }
    );
  }

  loadMessages(conversation_id: number) {
    this.chatService.getMessages(conversation_id).subscribe(
        (messages) => {
            this.messages = messages;
        },
        (error) => {
            console.error("Error fetching messages:", error);
        }
    );
}


sendMessage() {
  if (!this.newMessage.trim()) return; // Prevent sending empty messages

  const messageData = {
      conversation_id: this.selectedConversation.conversation_id,
      sender_id: this.clientId, // Ensure clientId is set correctly
      message_text: this.newMessage
  };

  this.chatService.sendMessage(messageData).subscribe(
      (response) => {
          this.messages.push({
              sender_id: this.clientId,
              message_text: this.newMessage
          });
          this.newMessage = ''; // Clear input field
      },
      (error) => {
          console.error("Error sending message:", error);
      }
  );
}

}
