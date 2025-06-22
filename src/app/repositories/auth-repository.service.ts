import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpUser } from '../interface/IDpUser';
import { AuthService } from '../services/auth.service';

/**
 * @ignore
 */

@Injectable({
  providedIn: 'root'
})
export class AuthRepositoryService {
  constructor(private authService: AuthService) {}

  login(user: IDpUser): Observable<{ token: string, userProjId?: number, achievementId?: number }> {
    return this.authService.login(user);
  }

  register(user: IDpUser): Observable<{ token: string, userProjId?: number, achievementId?: number }> {
    return this.authService.register(user);
  }

  logout(): void {
    this.authService.logout();
  }
}