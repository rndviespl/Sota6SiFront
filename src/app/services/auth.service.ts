import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  register(user: IDpUser): Observable<any> {
    const payload = {
      username: user.dpUsername,
      password: user.dpPassword,
      phoneNumber: user.dpPhoneNumber || '0000000000' // Default value if not provided
    };
    console.log('Registering user:', payload);
    return this.http.post(`${this.baseUrl}/register`, payload);
  }

  login(user: IDpUser): Observable<{ token: string }> {
    const payload = {
      username: user.dpUsername,
      password: user.dpPassword,
      phoneNumber: user.dpPhoneNumber || '0000000000' // Default value if not provided
    };
    console.log('Logging in user:', payload);
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, payload);
  }
}