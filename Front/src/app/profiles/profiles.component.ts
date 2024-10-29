import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, Employe, ParcoursProfilesService } from '../Services/parcours-profiles.service';

@Component({
  selector: 'app-profiles',
  standalone: true,
  imports: [NgFor,NgIf,CommonModule,FormsModule],
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.css'
})
export class ProfilesComponent {
  @Output() categorySelected = new EventEmitter<number>();
  categories: Category[] = [];
  employees: Employe[] = [];
  filteredEmployees: Employe[] = [];
  selectedCategoryId!: number;
  query!: string;
  constructor(private employeService: ParcoursProfilesService , private router:Router) {}

  ngOnInit(): void {
    this.loadCategories();
  }
  // acceder au categories
  loadCategories(): void {
    this.employeService.getCategories().subscribe(data => {
      this.categories = data;
      this.onCategorySelected(6); // j'ai fais ça en ngOnInit pour que j'affiche au debut la categorie Technologie !
    });
  }
  //identifie la categorie choisi 
  onCategorySelected(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.loadEmployees(categoryId);
    this.categorySelected.emit(categoryId);
  }
  // afficher l'ensemble des employees par categorie
  loadEmployees(categoryId: number): void {
    this.employeService.getProfilesByCategory(categoryId).subscribe(data => {
      this.employees = data;
    });
  }
  // acceder à un employe spécifique 
  viewEmployeeDetails(employeeId: number): void {
    this.router.navigate(['/employees', employeeId]);  // Navigue vers la page de l'employé
  }

  onSearchClick() : void {
    if (this.selectedCategoryId !== null) {
      this.employeService.searchemployees(this.selectedCategoryId, this.query).subscribe(employees => {
        this.employees = employees;
      });
    }
  }
}