import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ParcoursProfilesService {
  private baseUrl = 'http://localhost:5239/api/Category';
  private apiUrl = 'http://localhost:5239/api/Employe';

  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}`);
  }
   getProfilesByCategory(categoryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${categoryId}/employees`);
  }
  getEmployeById(id: number): Observable<Employe> {
    return this.http.get<Employe>(`${this.apiUrl}/id?id=${id}`);
  }
}
//pour definir notre data
export interface Category {
  categoryId: number;
  name: string;
} 
//pour definir notre data
export interface Employe {
  employeId:number;
  employeName: string;
  email: string;
  phone: string;
  post: string;
  place: string;
  password: string;
  profilePhotoUrl?: string;  // URL pour la photo de profil
  description: string;
  categoryName: string;
  reviews: ReviewDto[];      // Liste des avis (à définir)
  photoUrls?: string[];      // Liste des URLs des photos de travail
  videoUrls?: string[];      // Liste des URLs des vidéos de travail
}

export interface ReviewDto {
  rating: number;
  comment: string;
  reviewerName: string;
}