import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  saveUserData(token: string, Role: string, UserID:Number) {
    localStorage.setItem('token', token);
    localStorage.setItem('Role', Role);
    localStorage.setItem('UserID', UserID.toString()); // Converting to string to avoid type error in local storage
  }
  getUserID(): number | null {
    const userId = localStorage.getItem('UserID');
    return userId ? Number(userId) : null;  // ✅ Now properly retrieves user ID
  }

  redirectUser(Role: string) {
    console.log("Redirecting user with role:", Role); // Debugging log
    if (Role === 'admin') {
      this.router.navigate(['/admindashboard']);
    } else if (Role === 'client') {
      this.router.navigate(['/clientdashboard']);
    } else if (Role === 'user') {
      this.router.navigate(['/userdashboard']);
    } else {
      this.router.navigate(['/']);
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('Role');
    this.router.navigate(['/login']);
  }
}
