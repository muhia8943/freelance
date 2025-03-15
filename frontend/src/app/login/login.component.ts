import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private loginService: LoginService) {}

  onLogin() {
    const userData = {
      email: this.email,
      password: this.password
    };
  
    this.loginService.login(userData).subscribe({
      next: response => {
        console.log('Login successful:', response);
        alert('login successful');
  
        // Debugging: Check if userID and role are present
        console.log("User Role received:", response.Role || response.role);
        console.log("User ID received:", response.userID || response.UserID);
  
        // Fix: Ensure role is correctly extracted
        const userRole = response.role || response.Role;
        const userID = response.userID || response.UserID; // Handle different cases
  
        if (!userRole || !userID) {
          console.error("Role or UserID is missing in response:", response);
          alert("Error: Missing data from server response.");
          return;
        }
  
        // Save token, role, and userID
        this.loginService.saveUserData(response.token, userRole, userID);
  
        // Redirect based on role
        this.loginService.redirectUser(userRole);
      },
      error: error => {
        console.error('Login failed:', error);
        alert('Invalid email or password. Please try again.');
      }
    });
  }
  
}