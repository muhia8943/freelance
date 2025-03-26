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
  clientJobs: any[] = []; // Stores jobs created by the client
  selectedJobId: number | null = null;
  jobApplications: any[] = [];
  showApplicationsModal: boolean = false;

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
}
