import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FreelancerService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  getFreelancers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/freelancers`);
  }
}
