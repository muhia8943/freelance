import { Component, OnInit } from '@angular/core';
import { AlljobsService } from '../../services/userservices/alljobs.service';
import { JobApplicationService } from '../../services/userservices/job-application.service';
import { LoginService } from '../../services/login.service'; // Import LoginService
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discover',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './discover.component.html',
  styleUrl: './discover.component.css'
})
export class DiscoverComponent implements OnInit {
  jobs: any[] = [];
  freelancerId: number | null = null; // Initialize as null

  constructor(
    private allJobsService: AlljobsService,
    private jobApplicationService: JobApplicationService,
    private loginService: LoginService // Inject LoginService
  ) {}

  ngOnInit(): void {
    this.freelancerId = this.loginService.getUserID(); // Get user ID from local storage
    if (!this.freelancerId) {
      console.error('User ID not found in local storage.');
    }
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.allJobsService.getAllJobs().subscribe(
      (data) => {
        console.log('Jobs:', data);
        this.jobs = data;
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  applyForJob(jobId: number): void {
    if (!this.freelancerId) {
      alert('You must be logged in to apply for jobs.');
      return;
    }

    const coverLetter = prompt('Enter your cover letter:');
    if (coverLetter) {
      this.jobApplicationService.applyForJob(jobId, this.freelancerId, coverLetter).subscribe({
        next: () => {
          alert('Application sent successfully!');
        },
        error: (error) => {
          alert('Error applying for job.');
          console.error(error);
        }
      });
    }
  }
}
