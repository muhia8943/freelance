import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = '';

  constructor(private authService: AuthService) {}

  onRegister() {
    const selectedRoles = document.querySelectorAll<HTMLInputElement>('input[name="role"]:checked');
    const rolesArray = Array.from(selectedRoles).map(input => input.value);

    if (rolesArray.length !== 1) {
      alert('Please select exactly one role (Client or Freelancer).');
      return;
    }

    this.role = rolesArray[0];

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.authService.register(userData).subscribe({
      next: response => {
        console.log('User registered:', response);
        alert('Registration successful!');
      },
      error: error => {
        console.error('Registration failed:', error);
        alert('Registration failed. Please try again.');
      }
    });
  }
}
