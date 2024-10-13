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
  addReview(employeId: number, review: ReviewAdd): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/${employeId}/reviews`, review);
  }


}
export interface Review {
  authorName: string;
  reviewComment: string;
  date:any;
}
export interface ReviewAdd {
  authorName: string;
  reviewComment: string;
}
