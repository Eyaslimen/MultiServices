import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5239/api/Employe';
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;
  
  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<any>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user, {
      headers: { 'Content-Type': 'application/json' }
    }).pipe(
      tap(response => {
        console.log('Login response:', response); // Vérifiez les valeurs ici
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
      }),
      catchError(error => {
        console.error('Error logging in', error); // Ajoutez des journaux pour les erreurs
        return throwError(error);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser;
  }

  register(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData).pipe(
      tap((response: any) => {
        console.log('User registered successfully:', response);
      }),
      catchError(error => {
        console.error('Error registering user:', error);
        return throwError(error);
      })
    );
  }

}