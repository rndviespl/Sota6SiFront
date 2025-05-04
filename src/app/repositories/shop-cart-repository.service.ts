import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAddToCartRequest } from '../interface/IAddToCartRequest';
import { ICartViewModel } from '../interface/ICartViewModel';
import { IRemoveFromCartRequest } from '../interface/IRemoveFromCartRequest';
import { IUpdateCartRequest } from '../interface/IUpdateCartRequest';

@Injectable({
  providedIn: 'root'
})
export class ShopCartRepositoryService {
  private cartKey = 'shopping_cart';

  constructor() { }

  getCart(): Observable<ICartViewModel> {
    const cart = JSON.parse(localStorage.getItem(this.cartKey) || '{}');
    return of(cart);
  }

  updateCart(request: IUpdateCartRequest): Observable<{ success: boolean; message: string }> {
    let cart = JSON.parse(localStorage.getItem(this.cartKey) || '{}');
    // Логика обновления корзины
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    return of({ success: true, message: 'Корзина обновлена' });
  }

  addToCart(request: IAddToCartRequest): Observable<{ success: boolean; message: string }> {
    let cart = JSON.parse(localStorage.getItem(this.cartKey) || '{}');
    // Логика добавления товара в корзину
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    return of({ success: true, message: 'Товар добавлен в корзину' });
  }

  getCartQuantity(productId: number, sizeId: number): Observable<{ currentQuantity: number }> {
    const cart = JSON.parse(localStorage.getItem(this.cartKey) || '{}');
    // Логика получения количества товара в корзине
    const currentQuantity = 0; // Замените на реальную логику
    return of({ currentQuantity });
  }

  checkout(): Observable<{ orderId: number; orderDetails: any[] }> {
    const cart = JSON.parse(localStorage.getItem(this.cartKey) || '{}');
    // Логика оформления заказа
    localStorage.removeItem(this.cartKey);
    return of({ orderId: 1, orderDetails: [] });
  }

  removeFromCart(request: IRemoveFromCartRequest): Observable<void> {
    let cart = JSON.parse(localStorage.getItem(this.cartKey) || '{}');
    // Логика удаления товара из корзины
    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    return of(undefined); // Возвращаем Observable<void>
  }

  exportToExcel(orderId: number): Observable<Blob> {
    // Логика экспорта в Excel
    return of(new Blob());
  }
}
