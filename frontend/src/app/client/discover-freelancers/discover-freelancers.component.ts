import { Component, OnInit } from '@angular/core';
import { FreelancerService } from '../../services/freelancer.service';
import { ChatService } from '../../services/chat.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service'; // ✅ Import LoginService

@Component({
  selector: 'app-discover-freelancers',
  imports: [CommonModule, RouterLink],
  templateUrl: './discover-freelancers.component.html',
  styleUrl: './discover-freelancers.component.css'
})
export class DiscoverFreelancersComponent implements OnInit {
  freelancers: any[] = [];
  clientId: number | null = null; // ✅ Fetch dynamically

  constructor(
    private freelancerService: FreelancerService,
    private chatService: ChatService,
    private loginService: LoginService,  // ✅ Inject LoginService
    private router: Router
  ) {}

  ngOnInit(): void {
    // ✅ Fetch client ID from LoginService instead of directly using localStorage
    this.clientId = this.loginService.getUserID();

    if (!this.clientId) {
      console.error('Client ID is missing. Ensure user is logged in.');
      return;
    }

    this.fetchFreelancers();
  }

  fetchFreelancers(): void {
    this.freelancerService.getFreelancers().subscribe(
      (data) => {
        this.freelancers = data;
      },
      (error) => {
        console.error('Error fetching freelancers:', error);
      }
    );
  }

  connectToFreelancer(freelancer: any) {
    if (!this.clientId) {
      console.error('Client ID is missing');
      return;
    }
  
    // ✅ Extract freelancer ID properly
    const freelancerId = freelancer.UserID;
  
    if (!freelancerId || isNaN(Number(freelancerId))) {
      console.error('Invalid freelancer ID:', freelancer);
      return;
    }
  
    this.chatService.createConversation(this.clientId, Number(freelancerId)).subscribe(
      (response) => {
        console.log('Conversation created:', response);
        this.router.navigate(['/clientchat'], { queryParams: { conversationId: response.conversation_id } });
      },
      (error) => {
        console.error('Error creating conversation:', error);
      }
    );
  }
  
}
