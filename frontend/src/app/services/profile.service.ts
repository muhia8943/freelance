import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  // Fetch user profile
  getProfile(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile/${userId}`);
  }

  // Update user profile
  updateProfile(userId: number, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${userId}`, updatedData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // ✅ Ensures JSON format
    }).pipe(
      catchError((error) => {
        console.error('Profile Update Error:', error);
        return throwError(() => new Error('Failed to update user profile'));
      })
    );
  }
}
