import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpOrderComposition } from '../interface/IDpOrderComposition';

@Injectable({
  providedIn: 'root'
})
export class DpOrderCompositionsService {
  private baseUrl = `${window.location.origin}/api/DpOrderCompositions`;

  constructor(private http: HttpClient) {}

  getAllDpOrderCompositions(): Observable<IDpOrderComposition[]> {
    return this.http.get<IDpOrderComposition[]>(this.baseUrl);
  }

  getDpOrderCompositionById(id: number): Observable<IDpOrderComposition> {
    return this.http.get<IDpOrderComposition>(`${this.baseUrl}/${id}`);
  }

  createDpOrderComposition(dpOrderComposition: IDpOrderComposition): Observable<IDpOrderComposition> {
    return this.http.post<IDpOrderComposition>(this.baseUrl, dpOrderComposition);
  }

  updateDpOrderComposition(id: number, dpOrderComposition: IDpOrderComposition): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dpOrderComposition);
  }

  deleteDpOrderComposition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
