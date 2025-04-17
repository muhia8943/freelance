import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobService } from '../../services/job.service'; // Adjust path as needed
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-jobs',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './manage-jobs.component.html',
  styleUrl: './manage-jobs.component.css'
})
export class ManageJobsComponent implements OnInit {
  allJobs: any[] = [];

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.fetchAllJobs();
  }

  fetchAllJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (jobs) => {
        this.allJobs = jobs;
      },
      error: (err) => {
        console.error('Error fetching jobs:', err);
      }
    });
  }

  deleteJob(jobId: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJobById(jobId).subscribe({
        next: () => {
          alert('Job deleted successfully!');
          this.allJobs = this.allJobs.filter(job => job.id !== jobId);
        },
        error: (err) => {
          console.error('Failed to delete job:', err);
        }
      });
    }
  }
}
