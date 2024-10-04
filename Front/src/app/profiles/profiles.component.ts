import { Component, EventEmitter, Output } from '@angular/core';
import { Category, Employe,ParcoursProfilesService } from '../parcours-profiles.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  selectedCategoryId!: number;
  constructor(private employeService: ParcoursProfilesService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.employeService.getCategories().subscribe(data => {
      this.categories = data;
      console.log(data);
    });
  }

  onCategorySelected(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.loadEmployees(categoryId);
    this.categorySelected.emit(categoryId);

  }

  loadEmployees(categoryId: number): void {
    this.employeService.getProfilesByCategory(categoryId).subscribe(data => {
      this.employees = data;
    });
  }
}