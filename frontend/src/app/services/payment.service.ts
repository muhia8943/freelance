import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = 'http://localhost:3000/api/jobs/completed/client';
  private url = 'http://localhost:3000/api/job-completion/jobs';

  constructor(private http: HttpClient) {}

  getCompletedJobsForClient(clientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${clientId}`);
  }
   // Rate a completed job
   rateCompletedJob(jobId: number, rating: number): Observable<any> {
    return this.http.post(`${this.url}/rate`, { jobId, rating });
  }
}
