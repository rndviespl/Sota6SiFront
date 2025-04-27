import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpUser } from '../interface/IDpUser';

@Injectable({
  providedIn: 'root'
})
export class DpUsersService {
  private baseUrl = `${window.location.origin}/api/DpUsers`;

  constructor(private http: HttpClient) {}

  getAllDpUsers(): Observable<IDpUser[]> {
    return this.http.get<IDpUser[]>(this.baseUrl);
  }

  getDpUserById(id: number): Observable<IDpUser> {
    return this.http.get<IDpUser>(`${this.baseUrl}/${id}`);
  }

  createDpUser(dpUser: IDpUser): Observable<IDpUser> {
    return this.http.post<IDpUser>(this.baseUrl, dpUser);
  }

  updateDpUser(id: number, dpUser: IDpUser): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dpUser);
  }

  deleteDpUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
