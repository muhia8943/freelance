import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViewApplicationsService {
  private apiUrl = 'http://localhost:3000/api/job-applications';

  constructor(private http: HttpClient) {}

  // Get applications for a specific job
  getApplicationsByJob(jobId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/job/${jobId}`);
  }

  // Update application status (Accept/Reject)
  updateApplicationStatus(applicationId: number, status: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-status`, { applicationId, status });
  }
}
