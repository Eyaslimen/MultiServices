import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms'; //pour ngModel
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css'
})
export class UserprofileComponent  implements OnInit {
    currentUser: any;
  
    constructor(private authService: AuthService) {}
  
    ngOnInit(): void {
      this.authService.getCurrentUser().subscribe(user => {
        this.currentUser = user;
      });
    }
  }

