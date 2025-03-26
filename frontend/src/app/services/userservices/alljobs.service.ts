import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlljobsService {
  private apiUrl = 'http://localhost:3000/api/jobs'; // Backend endpoint

  constructor(private http: HttpClient) {}

  getAllJobs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
