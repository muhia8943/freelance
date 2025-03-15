import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:3000/api/jobs';

  constructor(private http: HttpClient) {}

  createJob(jobData: any): Observable<any> {
    return this.http.post(this.apiUrl, jobData);
  }
  getClientJobs(clientId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/client/${clientId}`);
  }
  
}
