import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  private apiUrl = 'http://localhost:3000/api/job-applications/apply';

  constructor(private http: HttpClient) {}

  applyForJob(jobId: number, freelancerId: number, coverLetter: string): Observable<any> {
    const payload = { job_id: jobId, freelancer_id: freelancerId, cover_letter: coverLetter };
    return this.http.post(this.apiUrl, payload);
  }
  getApplicationsByFreelancer(freelancerId: number): Observable<any> {
    return this.http.get(`http://localhost:3000/api/job-applications/freelancer/${freelancerId}`);
  }
  submitJobWork(submissionData: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/job-completion/submit', submissionData);
  }
  
}
