import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpUser } from '../interface/IDpUser';
import { DpUsersService } from '../services/dp-users.service';

@Injectable({
  providedIn: 'root'
})
export class UsersRepositoryService {
  constructor(private dpUsersService: DpUsersService) {}

  getAllDpUsers(): Observable<IDpUser[]> {
    return this.dpUsersService.getAllDpUsers();
  }

  getDpUserById(id: number): Observable<IDpUser> {
    return this.dpUsersService.getDpUserById(id);
  }

  createDpUser(dpUser: IDpUser): Observable<IDpUser> {
    return this.dpUsersService.createDpUser(dpUser);
  }

  updateDpUser(id: number, dpUser: IDpUser): Observable<void> {
    return this.dpUsersService.updateDpUser(id, dpUser);
  }

  deleteDpUser(id: number): Observable<void> {
    return this.dpUsersService.deleteDpUser(id);
  }
}