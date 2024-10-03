import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ParcoursProfilesService {
  private baseUrl = 'http://localhost:5239/api/Employe';
  constructor(private http: HttpClient) { }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories`);
  }
  getProductsByCategory(categoryId: number): Observable<Employe[]> {
    return this.http.get<Employe[]>(`${this.baseUrl}/categories/${categoryId}/products`);
  }
}
//pour definir notre data
export interface Category {
  id: number;
  name: string;
}
//pour definir notre data
export interface Employe {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}
