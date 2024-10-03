import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css'
})
export class ImagesComponent implements OnInit {
  currentUser: any;
  
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user;
    });
  }
}
