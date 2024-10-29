import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ParcoursProfilesService } from '../../Services/parcours-profiles.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Review, ReviewAdd, ReviewServiceService } from '../../Services/review-service.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit  {
  currentUser: any;
  isCurrentUser: boolean = false;  // Savoir si on affiche le profil de l'utilisateur connecté ou d'un autre employé
  review: Review = { authorName: '', reviewComment: '',date:''};
  reviewAdd: ReviewAdd = { authorName: '', reviewComment: ''};
  Reviews:Review[]=[];
  employeeId:any;
  successMessage: string = ''; 
  constructor(
    private authService: AuthService,
    private employeService: ParcoursProfilesService,  // Injecte le service des employés
    private route: ActivatedRoute,
    private router:Router,  // Pour récupérer l'ID de l'employé dans l'URL
    private reviewService: ReviewServiceService
  ) {}

  ngOnInit(): void {
    // Vérifier s'il y a un ID dans l'URL
    this.employeeId = this.route.parent?.snapshot.paramMap.get('id');
    if (this.employeeId) {
      // Si un ID est présent dans l'URL, on récupère les détails de l'employé spécifique
      this.employeService.getEmployeById(Number(this.employeeId)).subscribe(employee => {
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
    this.getReviews(this.currentUser.employeId);
  }
  addReview() {
    console.log("Review to add:", this.reviewAdd);  // Pour vérifier si les champs sont bien remplis
    this.reviewService.addReview(this.employeeId, this.reviewAdd).subscribe(
      response => {
        this.successMessage = 'Votre commentaire a été envoyé avec succès !'; // Message de succès
        console.log("Review added successfully", response);
      },
      error => {
        console.error("Error adding review", error);
      }
      
    );
    this.getReviews(this.employeeId);
    this.reviewAdd.authorName='';
    this.reviewAdd.reviewComment='';
  }
  getReviews(employeeId: number): void {
    this.reviewService.getReviews(employeeId).subscribe(
      (reviews: Review[]) => {
        this.Reviews = reviews.reverse(); // Stock les reviews récupérées de plus récent
        console.log(reviews);
      },
      error => {
        console.error('Error fetching reviews', error);
      }
    );
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

    return date.toLocaleDateString('en-US', options);
  }
  
}

