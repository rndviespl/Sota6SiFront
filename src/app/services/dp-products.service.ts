import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpProduct } from '../interface/IDpProduct';
import { IAddToCartRequest } from '../interface/IAddToCartRequest';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = `${window.location.origin}/api/Products`;

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<IDpProduct[]> {
    return this.http.get<IDpProduct[]>(this.baseUrl);
  }

  getProductById(id: number): Observable<IDpProduct> {
    return this.http.get<IDpProduct>(`${this.baseUrl}/${id}`);
  }

  createProduct(product: IDpProduct): Observable<IDpProduct> {
    return this.http.post<IDpProduct>(this.baseUrl, product);
  }

  updateProduct(id: number, product: IDpProduct): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  addToCart(request: IAddToCartRequest): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/AddToCart`, request);
  }
}
