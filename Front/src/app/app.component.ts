import { Component, OnInit } from '@angular/core';
import {RouterLink, RouterOutlet } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AuthService } from './Services/auth.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterLink,NgClass,CommonModule,NgIf,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'multiServices_front';
  currentUser: any;
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}
