import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:3000/api/jobs';
  private baseUrl = 'http://localhost:3000/api/jobs/completed/freelancer';


  constructor(private http: HttpClient) {}

  createJob(jobData: any): Observable<any> {
    return this.http.post(this.apiUrl, jobData);
  }
  getClientJobs(clientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/${clientId}`);
  }
  getAllJobs() {
    return this.http.get<any[]>('http://localhost:3000/api/jobs');
  }
  
  deleteJobById(jobId: number) {
    return this.http.delete(`http://localhost:3000/api/jobs/${jobId}`);
  }
  getCompletedJobsForFreelancer(freelancerId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${freelancerId}`);
  }
}
