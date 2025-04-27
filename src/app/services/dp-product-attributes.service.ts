import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpProductAttribute } from '../interface/IDpProductAttribute';

@Injectable({
  providedIn: 'root'
})

export class DpProductAttributesService {
  private baseUrl = `${window.location.origin}/api/DpProductAttributes`;

  constructor(private http: HttpClient) {}

  getAllDpProductAttributes(): Observable<IDpProductAttribute[]> {
    return this.http.get<IDpProductAttribute[]>(this.baseUrl);
  }

  getDpProductAttributeById(id: number): Observable<IDpProductAttribute> {
    return this.http.get<IDpProductAttribute>(`${this.baseUrl}/${id}`);
  }

  createDpProductAttribute(dpProductAttribute: IDpProductAttribute): Observable<IDpProductAttribute> {
    return this.http.post<IDpProductAttribute>(this.baseUrl, dpProductAttribute);
  }

  updateDpProductAttribute(id: number, dpProductAttribute: IDpProductAttribute): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dpProductAttribute);
  }

  deleteDpProductAttribute(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
