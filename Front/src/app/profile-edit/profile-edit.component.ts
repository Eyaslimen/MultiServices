import { Component } from '@angular/core';
import  {OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Pour faire une requête HTTP au backend
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router'; // Pour rediriger après la mise à jour
import { AuthService } from '../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet,RouterModule,NgFor],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
    export class ProfileEditComponent implements OnInit {
      user: any = {
        employeName: '',
        email: '',
        place: '',
        password: '',
        description: '',
        photoUrls: [],
        videoUrls: [],
        profilePhotoUrl: ''  // Ajout d'un champ pour la photo de profil
      };
      newPhotos: File[] = [];
      newVideos: File[] = [];
      constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

      ngOnInit() {
        this.loadUserProfile();
      }

       // prend les infos de user qui est connecté
      loadUserProfile() {
        this.authService.getCurrentUser().subscribe(response => {
          this.user = response; // Charger les infos actuelles
        });
      }
      handleProfilePhotoInput(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input && input.files) {
          this.user.profilePhoto = input.files[0]; // Stocker la photo de profil sélectionnée
        }
      }
      handleWorkPhotosInput(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input && input.files) {
          this.newPhotos = Array.from(input.files); // Stocke les nouvelles photos ( que l'utilisateur upload)
        }
      }

      handleWorkVideosInput(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input && input.files) {
          this.newVideos = Array.from(input.files); // Stocke les nouvelles vidéos ( que l'utilisateur upload)
        }
      }

      removePhoto(index: number) {
        console.log(this.user.photoUrls);
        this.user.photoUrls.splice(index, 1); // Supprimer une photo existante
        console.log(this.user.photoUrls);
      }

      removeVideo(index: number) {
        this.user.videoUrls.splice(index, 1); // Supprimer une vidéo existante
      }
     annuler() {
      this.router.navigate(['/userprofile/profile']); 
     }
      onSubmit(form: any) {
        if (form.valid) {
          console.log(this.user.photoUrls);
          const formData = new FormData(); 
          //verifier que EmployeName, Phone, Place .. sont déclarées comme ça dans le backend , minus ou majs peut faire du probleme !!
          formData.append('EmployeName', form.value.employeName);
          formData.append('Phone', form.value.phone);
          formData.append('Place', form.value.place); 
          formData.append('Description', form.value.description);
          formData.append('Email', form.value.email); 

          if (form.value.password) {
            formData.append('Password', form.value.password);
          }
          if (this.user.profilePhoto) {
            formData.append('ProfilePhoto', this.user.profilePhoto, this.user.profilePhoto.name);
          }
          // Ajouter les nouveaux fichiers de photos
          this.newPhotos.forEach(photo => {
            formData.append('WorkPhotos', photo, photo.name);
          });

          // Ajouter les nouveaux fichiers de vidéos
          this.newVideos.forEach(video => {
            formData.append('WorkVideos', video, video.name);
          });

          // Ajouter les URLs actuelles des photos
          this.user.photoUrls.forEach((url: string) => {
          formData.append('PhotoUrls', url);
          });

          // Ajouter les URLs actuelles des vidéos
          this.user.videoUrls.forEach((url: string) => {
            formData.append('VideoUrls', url);
          });

          this.authService.update(formData).subscribe();
          this.router.navigate(['/userprofile/profile']); 
        }
      }
    }