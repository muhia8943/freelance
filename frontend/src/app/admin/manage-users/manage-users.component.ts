import { Component,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchUsers();
  }

  fetchUsers() {
    this.http.get<any[]>('http://localhost:3000/api/auth/users').subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:3000/api/auth/users/${userId}`).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.UserID !== userId);
          alert('User deleted successfully.');
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }
}
