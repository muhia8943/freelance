import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobService } from '../../services/job.service';
import { ViewApplicationsService } from '../../services/view-applications.service'; // Updated service name
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mytasks',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './mytasks.component.html',
  styleUrl: './mytasks.component.css'
})
export class MytasksComponent implements OnInit {
  clientJobs: any[] = []; 
  selectedJobId: number | null = null;
  jobApplications: any[] = [];
  jobSubmissions: any[] = []; // Stores job submissions
  showApplicationsModal: boolean = false;
  showSubmissionsModal: boolean = false;

  constructor(
    private jobService: JobService, 
    private viewApplicationsService: ViewApplicationsService, // Updated service name
    private loginService: LoginService
  ) {}

  ngOnInit() {
    this.fetchClientJobs();
  }

  fetchClientJobs() {
    const clientId = this.loginService.getUserID();
    if (clientId) {
      this.jobService.getClientJobs(clientId).subscribe({
        next: (jobs) => {
          this.clientJobs = jobs;
        },
        error: (error) => {
          console.error('Failed to fetch client jobs:', error);
        }
      });
    }
  }

  // Fetch applications for a selected job
  viewApplications(jobId: number) {
    this.selectedJobId = jobId;
    this.viewApplicationsService.getApplicationsByJob(jobId).subscribe({
      next: (applications) => {
        this.jobApplications = applications;
        this.showApplicationsModal = true;
      },
      error: (error) => {
        console.error('Failed to fetch applications:', error);
      }
    });
  }

  // Approve or Reject an application
  updateApplicationStatus(applicationId: number, status: string) {
    this.viewApplicationsService.updateApplicationStatus(applicationId, status).subscribe({
      next: () => {
        // Update UI
        this.jobApplications = this.jobApplications.map(app =>
          app.id === applicationId ? { ...app, status } : app
        );
      },
      error: (error) => {
        console.error('Failed to update status:', error);
      }
    });
  }
  viewSubmissions(jobId: number) {
    this.selectedJobId = jobId;
    this.viewApplicationsService.getSubmissionsByJob(jobId).subscribe({
      next: (submissions) => {
        this.jobSubmissions = submissions;
        this.showSubmissionsModal = true;
      },
      error: (error) => console.error('Failed to fetch submissions:', error)
    });
  }

 approveSubmission(submissionId: number) {
  const clientId = this.loginService.getUserID();
  
  if (clientId === null) {
    console.error('Client ID is null. Unable to approve submission.');
    return;
  }

  this.viewApplicationsService.approveSubmission(submissionId, clientId).subscribe({
    next: () => {
      alert('Submission approved successfully!');
      this.jobSubmissions = this.jobSubmissions.filter(sub => sub.id !== submissionId);
    },
    error: (error) => console.error('Failed to approve submission:', error)
  });
}

  rejectSubmission(submissionId: number) {
    const reason = prompt("Enter the reason for rejection:");
    if (!reason) return;

    this.viewApplicationsService.rejectSubmission(submissionId, reason).subscribe({
      next: () => {
        alert('Submission rejected.');
        this.jobSubmissions = this.jobSubmissions.filter(sub => sub.id !== submissionId);
      },
      error: (error) => console.error('Failed to reject submission:', error)
    });
  }
}
