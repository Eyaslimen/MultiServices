import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Services/auth.service';
import { FormsModule } from '@angular/forms'; //pour ngModel
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { ParcoursProfilesService } from '../Services/parcours-profiles.service';
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
  isCurrentUser: boolean = false;  // Savoir si on affiche le profil de l'utilisateur connecté ou d'un autre employé

  constructor(
    private authService: AuthService,
    private employeService: ParcoursProfilesService,  // Injecte le service des employés
    private route: ActivatedRoute  // Pour récupérer l'ID de l'employé dans l'URL
  ) {}

  ngOnInit(): void {
    // Vérifier s'il y a un ID dans l'URL
    const employeeId = this.route.snapshot.paramMap.get('id');

    if (employeeId) {
      // Si un ID est présent dans l'URL, on récupère les détails de l'employé spécifique
      this.employeService.getEmployeById(Number(employeeId)).subscribe(employee => {
        if (Array.isArray(employee)) {
          this.currentUser = employee[0];  // Prends le premier élément du tableau
        } else {
          this.currentUser = employee;  // Sinon, assigne l'objet directement
        }
        this.isCurrentUser = false;  // Ce n'est pas l'utilisateur connecté
      });
    } else {
      // Sinon, on récupère les détails de l'utilisateur connecté
      this.authService.getCurrentUser().subscribe(user => {
        this.currentUser = user;
        this.isCurrentUser = true;  // C'est l'utilisateur connecté
      });
    }
  }

  selectTab(tab: string) {
    this.currentTab = tab;
  }
}