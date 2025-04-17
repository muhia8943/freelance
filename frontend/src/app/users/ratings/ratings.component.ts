import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';  // Import the job service
import { LoginService } from '../../services/login.service';  // Import the login service
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css'],
  imports:[RouterLink,CommonModule,FormsModule]
})
export class RatingsComponent implements OnInit {
  freelancerId: number | null = null;  // Freelancer ID (nullable)
  completedJobs: any[] = [];  // Store completed jobs

  constructor(
    private jobService: JobService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Retrieve the freelancer's ID from the LoginService
    this.freelancerId = this.loginService.getUserID();

    // If freelancer ID exists, fetch the completed jobs
    if (this.freelancerId) {
      this.loadCompletedJobs();
    } else {
      console.error('Freelancer ID not found in local storage.');
    }
  }

  loadCompletedJobs(): void {
    if (this.freelancerId) {
      this.jobService.getCompletedJobsForFreelancer(this.freelancerId).subscribe(
        (jobs) => {
          this.completedJobs = jobs;
        },
        (error) => {
          console.error('Error fetching completed jobs:', error);
        }
      );
    }
  }

}
