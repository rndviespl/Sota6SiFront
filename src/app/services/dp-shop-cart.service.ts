import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartViewModel } from '../interface/ICartViewModel';
import { IAddToCartRequest } from '../interface/IAddToCartRequest';
import { IUpdateCartRequest } from '../interface/IUpdateCartRequest';
import { IDpOrderDetail } from '../interface/IDpOrderDetail';
import { IRemoveFromCartRequest } from '../interface/IRemoveFromCartRequest';

@Injectable({
  providedIn: 'root'
})
export class ShopCartService {
  private baseUrl = `${window.location.origin}/api/ShopCart`;

  constructor(private http: HttpClient) {}

  getCart(): Observable<ICartViewModel> {
    return this.http.get<ICartViewModel>(this.baseUrl);
  }

  updateCart(request: IUpdateCartRequest): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/UpdateCart`, request);
  }

  addToCart(request: IAddToCartRequest): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/AddToCart`, request);
  }

  getCartQuantity(productId: number, sizeId: number): Observable<{ currentQuantity: number }> {
    return this.http.get<{ currentQuantity: number }>(`${this.baseUrl}/quantity?productId=${productId}&sizeId=${sizeId}`);
  }

  checkout(cart: any[]): Observable<{ orderId: number; orderDetails: IDpOrderDetail[] }> {
    return this.http.post<{ orderId: number; orderDetails: IDpOrderDetail[] }>(`${this.baseUrl}/Checkout`, cart);
  }

  removeFromCart(request: IRemoveFromCartRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/RemoveFromCart`, request);
  }

  exportToExcel(orderId: number): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export?orderId=${orderId}`, {}, { responseType: 'blob' });
  }
}