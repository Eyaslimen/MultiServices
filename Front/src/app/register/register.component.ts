import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  profilePhoto: File | null = null;
  workPhotos: File[] = [];
  workVideos: File[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  handleProfilePhotoInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files && input.files.length > 0) {
      this.profilePhoto = input.files.item(0);
    }
  }

  handleWorkPhotosInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.workPhotos = Array.from(input.files);
    }
  }

  handleWorkVideosInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input && input.files) {
      this.workVideos = Array.from(input.files);
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      const formData = new FormData();
      formData.append('EmployeName', form.value.username);
      formData.append('Email', form.value.email);
      formData.append('Phone', form.value.phone);
      formData.append('Post', form.value.post);
      formData.append('Place', form.value.place);
      formData.append('Password', form.value.password);
      formData.append('Description', form.value.description);
      formData.append('CategoryName', form.value.categoryName);

      if (this.profilePhoto) {
        formData.append('ProfilePhoto', this.profilePhoto, this.profilePhoto.name);
      }

      if (this.workPhotos.length > 0) {
        this.workPhotos.forEach(photo => {
          formData.append('WorkPhotos', photo, photo.name);
        });
      }

      if (this.workVideos.length > 0) {
        this.workVideos.forEach(video => {
          formData.append('WorkVideos', video, video.name);
        });
      }

      // Utiliser le service AuthService pour envoyer les données
      this.authService.register(formData).subscribe({
        next: response => {
          console.log('User registered successfully:', response);
          this.router.navigate(['/login']); 
        },
        error: error => {
          console.error('Error registering user:', error);
          if (error.error) {
            console.log('Error details:', error.error);
            if (error.error.errors) {
              console.log('Validation errors:', error.error.errors);
            }
          }
        },
      });
    } else {
      console.error('Form is invalid or no file selected.');
    }
  }
}