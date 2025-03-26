import { Component, OnInit } from '@angular/core';
import { JobApplicationService } from '../../services/userservices/job-application.service';
import { UserChatService } from '../../services/userservices/user-chat.service'; // Updated Import
import { LoginService } from '../../services/login.service';
import { Router, RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-myjobs',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './myjobs.component.html',
  styleUrl: './myjobs.component.css'
})
export class MyjobsComponent implements OnInit {
  applications: any[] = [];
  freelancerId!: number; // Ensure it's always a number

  constructor(
    private jobApplicationService: JobApplicationService,
    private userChatService: UserChatService, // Updated Service Name
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const storedId = this.loginService.getUserID(); // Fetch from local storage
    if (storedId === null) {
      console.error('User ID not found. Please log in.');
      return;
    }
    
    this.freelancerId = storedId; // Ensure it's assigned only if valid
    this.getMyApplications();
  }

  getMyApplications(): void {
    if (this.freelancerId) {
      this.jobApplicationService.getApplicationsByFreelancer(this.freelancerId).subscribe({
        next: (data) => {
          console.log('Applications:', data);
          this.applications = data;
        },
        error: (error) => {
          console.error('Error fetching applications:', error);
        }
      });
    } else {
      console.error('Invalid freelancer ID');
    }
  }

  startChat(application: any): void {
    const clientId = application.job_client_id;
    if (!clientId || !this.freelancerId) {
      console.error('Client ID or Freelancer ID missing');
      return;
    }
  
    this.userChatService.createConversation(clientId, this.freelancerId).subscribe({
      next: (response) => {
        console.log('Conversation Created:', response);
        
        if (!response || !response.conversation_id) {
          console.error('Invalid conversation response:', response);
          return;
        }
  
        const conversationId = response.conversation_id;
        console.log('Navigating to chat with ID:', conversationId);
  
        this.router.navigate(['/chat']);
      },
      error: (error) => {
        console.error('Error creating conversation:', error);
      }
    });
  }
  
}

