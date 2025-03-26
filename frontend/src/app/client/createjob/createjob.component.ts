import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { JobService } from '../../services/job.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-createjob',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './createjob.component.html',
  styleUrl: './createjob.component.css'
})
export class CreatejobComponent {
  jobTitle: string = '';
  jobDescription: string = '';
  requiredSkills: string = '';
  jobBudget: number | null = null;
  jobDeadline: string = '';
  coverPhoto: string = ''; // New field for cover photo URL

  constructor(private jobService: JobService, private loginService: LoginService) {}

  onPostJob() {
    const clientId = this.loginService.getUserID(); // Get userID from localStorage

    const jobData = {
      client_id: clientId,
      title: this.jobTitle,
      description: this.jobDescription,
      required_skills: this.requiredSkills,
      budget: this.jobBudget,
      deadline: this.jobDeadline,
      coverPhoto: this.coverPhoto // Include cover photo in job data
    };

    this.jobService.createJob(jobData).subscribe({
      next: response => {
        console.log('Job posted:', response);
        alert('Job posted successfully!');
      },
      error: error => {
        console.error('Job creation failed:', error);
        alert('Failed to post job. Please try again.');
      }
    });
  }
}
