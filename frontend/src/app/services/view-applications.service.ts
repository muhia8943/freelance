import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewApplicationsService {
  private apiUrl = 'http://localhost:3000/api/job-applications';
  private submissionUrl = 'http://localhost:3000/api/job-completion';


  constructor(private http: HttpClient) {}

  // Get applications for a specific job
  getApplicationsByJob(jobId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/job/${jobId}`);
  }

  // Update application status (Accept/Reject)
  updateApplicationStatus(applicationId: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-status`, { applicationId, status });
  }
  getSubmissionsByJob(jobId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.submissionUrl}/submissions/${jobId}`);
  }

  // Approve a job submission
  approveSubmission(submissionId: number, clientId: number): Observable<any> {
    return this.http.post(`${this.submissionUrl}/approve`, { submission_id: submissionId, client_id: clientId });
  }

  // Reject a job submission
  rejectSubmission(submissionId: number, reason: string): Observable<any> {
    return this.http.post(`${this.submissionUrl}/reject`, { submission_id: submissionId, reason });
  }
}
