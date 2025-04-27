import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpSize } from '../interface/IDpSize';

@Injectable({
  providedIn: 'root'
})

export class DpSizesService {
  private baseUrl = `${window.location.origin}/api/DpSizes`;

  constructor(private http: HttpClient) {}

  getAllDpSizes(): Observable<IDpSize[]> {
    return this.http.get<IDpSize[]>(this.baseUrl);
  }

  getDpSizeById(id: number): Observable<IDpSize> {
    return this.http.get<IDpSize>(`${this.baseUrl}/${id}`);
  }

  createDpSize(dpSize: IDpSize): Observable<IDpSize> {
    return this.http.post<IDpSize>(this.baseUrl, dpSize);
  }

  updateDpSize(id: number, dpSize: IDpSize): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dpSize);
  }

  deleteDpSize(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
