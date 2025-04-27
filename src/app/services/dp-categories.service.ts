import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpCategory } from '../interface/IDpCategory';

@Injectable({
  providedIn: 'root'
})

export class DpCategoriesService {
  private baseUrl = `${window.location.origin}/api/DpCategories`;

  constructor(private http: HttpClient) {}

  getAllDpCategories(): Observable<IDpCategory[]> {
    return this.http.get<IDpCategory[]>(this.baseUrl);
  }

  getDpCategoryById(id: number): Observable<IDpCategory> {
    return this.http.get<IDpCategory>(`${this.baseUrl}/${id}`);
  }

  createDpCategory(dpCategory: IDpCategory): Observable<IDpCategory> {
    return this.http.post<IDpCategory>(this.baseUrl, dpCategory);
  }

  updateDpCategory(id: number, dpCategory: IDpCategory): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dpCategory);
  }

  deleteDpCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
