import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IDpUserProj } from '../interface/IDpUserProj';

@Injectable({
  providedIn: 'root'
})
export class AuthProjService {
  private baseUrl = `${window.location.origin}/api/AuthProj`;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  login(userProj: IDpUserProj): Observable<{ token: string, userProjId: number }> {
    const payload = {
      login: userProj.login,
      password: userProj.password,
    };
    return this.http.post<{ token: string, userProjId: number }>(`${this.baseUrl}/login`, payload).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('projToken', response.token);
          localStorage.setItem('userProjId', response.userProjId.toString());
          this.setAuthenticated(true);
        }
      })
    );
  }

  register(userProj: IDpUserProj): Observable<{ token: string, userProjId: number }> {
    const payload = {
      login: userProj.login,
      password: userProj.password
    };
    return this.http.post<{ token: string, userProjId: number }>(`${this.baseUrl}/register`, payload).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('projToken', response.token);
          localStorage.setItem('userProjId', response.userProjId.toString());
          this.setAuthenticated(true);
        }
      })
    );
  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }

  checkAuthStatus(): void {
    const token = localStorage.getItem('projToken');
    this.setAuthenticated(!!token);
  }

  logout(): void {
    localStorage.removeItem('projToken');
        localStorage.removeItem('token');
    localStorage.removeItem('userProjId');
    this.setAuthenticated(false);
  }
}