import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpUserProj } from '../interface/IDpUserProj';
import { AuthProjService } from '../services/auth-proj.service';

/**
 * @ignore
 */

@Injectable({
  providedIn: 'root'
})
export class AuthProjRepositoryService {
  constructor(private authProjService: AuthProjService) {}

  login(userProj: IDpUserProj): Observable<{ token: string, userProjId: number }> {
    return this.authProjService.login(userProj);
  }

  register(userProj: IDpUserProj): Observable<{ token: string, userProjId: number }> {
    return this.authProjService.register(userProj);
  }

  logout(): void {
    this.authProjService.logout();
  }
}