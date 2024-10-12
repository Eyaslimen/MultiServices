import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {
  private baseUrl = 'http://localhost:5239/api/Review';
  constructor(private http: HttpClient) { }

  getReviews(categoryId:number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/${categoryId}/reviews`);
  } 
  addReview(employeId: number, review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/${employeId}/reviews`, review);
  }


}
export interface Review {
  authName: string;
  ReviewComment: string;
  date: string;
}