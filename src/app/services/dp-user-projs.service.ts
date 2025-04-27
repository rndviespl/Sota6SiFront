import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpUserProj } from '../interface/IDpUserProj';

@Injectable({
  providedIn: 'root'
})

export class DpUserProjsService {
  private baseUrl = `${window.location.origin}/api/DpUserProjs`;

  constructor(private http: HttpClient) {}

  getAllDpUserProjs(): Observable<IDpUserProj[]> {
    return this.http.get<IDpUserProj[]>(this.baseUrl);
  }

  getDpUserProjById(id: number): Observable<IDpUserProj> {
    return this.http.get<IDpUserProj>(`${this.baseUrl}/${id}`);
  }

  createDpUserProj(dpUserProj: IDpUserProj): Observable<IDpUserProj> {
    return this.http.post<IDpUserProj>(this.baseUrl, dpUserProj);
  }

  updateDpUserProj(id: number, dpUserProj: IDpUserProj): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dpUserProj);
  }

  deleteDpUserProj(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
