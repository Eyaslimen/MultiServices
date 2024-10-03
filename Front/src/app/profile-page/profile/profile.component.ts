import { Component, Input, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; //pour ngModel
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { Router,RouterLink, RouterOutlet } from '@angular/router'; // on remarque qu'on n'import pas router !! on l'injecte comme un service , on l'ajoute pas a imports !!!
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule,RouterLink,RouterOutlet,RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
