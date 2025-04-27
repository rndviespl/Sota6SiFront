import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpOrder } from '../interface/IDpOrder';

@Injectable({
  providedIn: 'root'
})
export class DpOrdersService {
  private baseUrl = `${window.location.origin}/api/DpOrders`;

  constructor(private http: HttpClient) {}

  getAllDpOrders(): Observable<IDpOrder[]> {
    return this.http.get<IDpOrder[]>(this.baseUrl);
  }

  getDpOrderById(id: number): Observable<IDpOrder> {
    return this.http.get<IDpOrder>(`${this.baseUrl}/${id}`);
  }

  createDpOrder(dpOrder: IDpOrder): Observable<IDpOrder> {
    return this.http.post<IDpOrder>(this.baseUrl, dpOrder);
  }

  updateDpOrder(id: number, dpOrder: IDpOrder): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dpOrder);
  }

  deleteDpOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
