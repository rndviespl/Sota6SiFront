import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IDpUser } from '../interface/IDpUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${window.location.origin}/api/Auth`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  register(user: IDpUser): Observable<{ token: string, userProjId?: number, achievementId?: number }> {
    const payload = {
      username: user.dpUsername,
      password: user.dpPassword,
      phoneNumber: user.dpPhoneNumber || '0000000000'
    };
    return this.http.post<{ token: string, userProjId?: number, achievementId?: number }>(`${this.baseUrl}/register`, payload).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          if (response.userProjId) {
            localStorage.setItem('userProjId', response.userProjId.toString());
          }
          this.setAuthenticated(true);
        }
      })
    );
  }

  login(user: IDpUser): Observable<{ token: string, userProjId?: number, achievementId?: number }> {
    const payload = {
      username: user.dpUsername,
      password: user.dpPassword,
      phoneNumber: user.dpPhoneNumber || '0000000000'
    };
    return this.http.post<{ token: string, userProjId?: number, achievementId?: number }>(`${this.baseUrl}/login`, payload).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          if (response.userProjId) {
            localStorage.setItem('userProjId', response.userProjId.toString());
          }
          this.setAuthenticated(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userProjId');
    this.setAuthenticated(false);
  }
}