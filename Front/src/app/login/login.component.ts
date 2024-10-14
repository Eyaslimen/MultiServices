import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  userLogin = {
    username: '',
    password: ''
  };

  constructor(private authService : AuthService,private router: Router) {}
  onSubmit2() {
    console.log('Attempting login with:', this.userLogin); // Ajoutez ce journal pour vérifier les valeurs
    this.authService.login(this.userLogin).subscribe({
      next: (response: any) => {
        console.log('Login successful', response);
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/home']);
      },
      error: (error: any) => {
        alert('Error logging in');
        console.error('Error logging in', error);
        console.log(this.userLogin);
      }
    });
  }

}
