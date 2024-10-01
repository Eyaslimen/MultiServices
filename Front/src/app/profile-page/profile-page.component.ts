import { Component } from '@angular/core';
import {RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterLink,RouterOutlet,NgClass,CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent {
  currentTab: string = 'profile'; // Onglet par défaut

  selectTab(tab: string) {
    this.currentTab = tab;
  }
}
