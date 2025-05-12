import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpUser } from '../interface/IDpUser';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryService {
  constructor(private authService: AuthService) {}

  register(user: IDpUser): Observable<any> {
    return this.authService.register(user);
  }

  login(user: IDpUser): Observable<{ token: string }> {
    return this.authService.login(user);
  }
}