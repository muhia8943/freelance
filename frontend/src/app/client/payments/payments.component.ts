import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class PaymentsComponent implements OnInit {
  completedJobs: any[] = [];
  clientId: number | null = null;
  selectedJob: any = null; // Store selected job for rating
  rating: number = 0; // Store rating value

  constructor(
    private paymentService: PaymentService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Retrieve the logged-in client's ID
    this.clientId = this.loginService.getUserID();

    // Check if we have a jobId stored in localStorage
    const storedJobId = localStorage.getItem('selectedJobId');
    if (storedJobId) {
      this.loadJobForRating(storedJobId); // Load the job for rating
    }

    if (this.clientId) {
      this.loadCompletedJobs();
    } else {
      console.error('Client ID not found in local storage.');
    }
  }

  loadCompletedJobs(): void {
    if (this.clientId) {
      this.paymentService.getCompletedJobsForClient(this.clientId).subscribe(
        (jobs) => {
          this.completedJobs = jobs;
        },
        (error) => {
          console.error('Error fetching completed jobs:', error);
        }
      );
    }
  }

  makePayment(job: any): void {
    console.log('Initiating payment for job:', job);
    // Implement actual payment logic here
  }

  // Store the selected jobId in localStorage
  openRatingModal(jobId: number): void {
    localStorage.setItem('selectedJobId', jobId.toString()); // Store as string
    this.loadJobForRating(jobId.toString()); // Pass as string
  }
  
  loadJobForRating(jobId: string): void {
    const job = this.completedJobs.find(job => job.id === parseInt(jobId, 10)); // Convert back to number
    if (job) {
      this.selectedJob = job;
      this.rating = 0; // Reset rating value when opening the rating
    } else {
      console.error('Job not found.');
    }
  }
  
  // Submit the rating
  submitRating(): void {
    if (this.selectedJob && this.rating >= 1 && this.rating <= 5) {
      this.paymentService.rateCompletedJob(this.selectedJob.id, this.rating).subscribe(
        (response) => {
          console.log('Rating submitted successfully!', response);
          this.selectedJob = null; // Clear selected job after submitting rating
          localStorage.removeItem('selectedJobId'); // Remove jobId from localStorage after submitting
        },
        (error) => {
          console.error('Error submitting rating:', error);
        }
      );
    } else {
      console.error('Invalid rating value');
    }
  }

  // Close the rating input without submitting
  closeRatingModal(): void {
    this.selectedJob = null; // Reset selected job if the user closes the modal
    localStorage.removeItem('selectedJobId'); // Remove jobId from localStorage
  }
}
