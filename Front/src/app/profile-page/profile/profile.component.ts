import { Component, Input, input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; //pour ngModel
import { NgFor } from '@angular/common';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router,RouterLink, RouterOutlet } from '@angular/router'; // on remarque qu'on n'import pas router !! on l'injecte comme un service , on l'ajoute pas a imports !!!
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { ParcoursProfilesService } from '../../parcours-profiles.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule,RouterLink,RouterOutlet,RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
