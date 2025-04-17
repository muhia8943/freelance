import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // adjust path as needed
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-userdashboard',
  imports: [RouterLink,CommonModule],
  templateUrl: './userdashboard.component.html',
  styleUrl: './userdashboard.component.css'
})
export class UserdashboardComponent implements OnInit {
  totalClients: number = 0;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getTotalClients().subscribe({
      next: (data) => {
        console.log('Total clients received:', data); // Optional debug log
        this.totalClients = data.totalClients; // Correct access to totalClients
      },
      error: (err) => {
        console.error('Failed to fetch client count:', err);
      }
    });
  }
  
}
