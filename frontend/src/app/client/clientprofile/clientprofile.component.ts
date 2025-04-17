import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service'; // ✅ Import LoginService

@Component({
  selector: 'app-clientprofile',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './clientprofile.component.html',
  styleUrls: ['./clientprofile.component.css']
})
export class ClientprofileComponent implements OnInit {
  userId: number | null = null; // ✅ Store userId dynamically
  userProfile: any;
  profileForm!: FormGroup;
  isEditing: boolean = false;

  constructor(
    private profileService: ProfileService,
    private loginService: LoginService,  // ✅ Inject LoginService
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userId = this.loginService.getUserID(); // ✅ Get user ID from localStorage
    if (this.userId !== null) {
      this.loadUserProfile();
    } else {
      console.error('User ID not found in local storage'); // Debugging log
    }
  }

  // Load user profile
  loadUserProfile(): void {
    if (this.userId !== null) {
      this.profileService.getProfile(this.userId).subscribe((data) => {
        this.userProfile = data;

        // Initialize form with user data
        this.profileForm = this.fb.group({
          username: [data.Username],
          email: [data.Email],
          phonenumber: [data.phonenumber],
          skills: [data.skills],
          bio: [data.bio],
          profile_picture: [data.profile_picture],
          role: [data.role] // ✅ Ensure role is included
        });
        
      });
    }
  }

  // Toggle edit mode
  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  // Save updated profile
  saveProfile(): void {
    if (this.profileForm.valid && this.userId !== null) {
      console.log("Form Data Before Sending:", this.profileForm.value); // 🔍 Debug log
  
      this.profileService.updateProfile(this.userId, this.profileForm.value).subscribe({
        next: (response) => {
          console.log("Profile Updated Successfully:", response); // ✅ API success log
          alert('Profile updated successfully');
          this.isEditing = false;
          this.loadUserProfile(); // Refresh the profile
        },
        error: (error) => {
          console.error("Profile Update Error:", error); // ❌ API error log
          alert('Failed to update profile');
        }
      });
    } else {
      console.warn("Form is invalid or user ID is missing!"); // ❗ Invalid form warning
    }
  }
  
}
