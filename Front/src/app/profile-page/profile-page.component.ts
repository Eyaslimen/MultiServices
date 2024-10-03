import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms'; //pour ngModel
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgClass,CommonModule,NgFor,NgIf,FormsModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  currentTab: string = 'profile'; // Onglet par défaut
  currentUser: any;
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }
  selectTab(tab: string) {
    this.currentTab = tab;
  }
}
