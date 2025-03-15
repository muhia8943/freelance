import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JobService } from '../../services/job.service';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mytasks',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './mytasks.component.html',
  styleUrl: './mytasks.component.css'
})
export class MytasksComponent implements OnInit {
  clientJobs: any[] = []; // Stores jobs created by the client

  constructor(private jobService: JobService, private loginService: LoginService) {}

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
}
