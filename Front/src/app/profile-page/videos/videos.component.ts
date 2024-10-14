import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ParcoursProfilesService } from '../../Services/parcours-profiles.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule],
  templateUrl: './videos.component.html',
  styleUrl: './videos.component.css'
})
export class VideosComponent implements OnInit  {
  currentUser: any;
  isCurrentUser: boolean = false;  // Savoir si on affiche le profil de l'utilisateur connecté ou d'un autre employé

  constructor(
    private authService: AuthService,
    private employeService: ParcoursProfilesService,  // Injecte le service des employés
    private route: ActivatedRoute,
    private router:Router  // Pour récupérer l'ID de l'employé dans l'URL
  ) {}

  ngOnInit(): void {
    // Vérifier s'il y a un ID dans l'URL
    const employeeId = this.route.parent?.snapshot.paramMap.get('id');
    console.log(employeeId);
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
}
