import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartViewModel } from '../interface/ICartViewModel';
import { IAddToCartRequest } from '../interface/IAddToCartRequest';
import { IUpdateCartRequest } from '../interface/IUpdateCartRequest';
import { IDpOrderDetail } from '../interface/IDpOrderDetail';
import { IRemoveFromCartRequest } from '../interface/IRemoveFromCartRequest';

/**
 * Сервис для работы с корзиной покупок (Shop Cart).
 *
 * @remarks
 * Позволяет получать содержимое корзины, добавлять и удалять товары, обновлять корзину, оформлять заказ и экспортировать заказ в Excel.
 */
@Injectable({
  providedIn: 'root'
})
export class ShopCartService {
  private baseUrl = `${window.location.origin}/api/ShopCart`;

  constructor(private http: HttpClient) {}

  /**
   * Получает текущее содержимое корзины.
   *
   * @returns {Observable<ICartViewModel>} Модель корзины.
   * @example
   * // GET /api/ShopCart
   * this.shopCartService.getCart().subscribe(cart => {
   *   // cart: { cartItems: [...], products: [...] }
   *   console.log(cart);
   * });
   */
  getCart(): Observable<ICartViewModel> {
    return this.http.get<ICartViewModel>(this.baseUrl);
  }

  /**
   * Обновляет содержимое корзины.
   *
   * @param {IUpdateCartRequest} request Данные для обновления корзины.
   * @returns {Observable<{ success: boolean; message: string }>} Результат обновления.
   * @example
   * // POST /api/ShopCart/UpdateCart
   * // Body:
   * // {
   * //   "productId": 1,
   * //   "quantity": 3,
   * //   "sizeId": 2
   * // }
   * this.shopCartService.updateCart({
   *   productId: 1,
   *   quantity: 3,
   *   sizeId: 2
   * }).subscribe(res => {
   *   // res: { success: true, message: "Cart updated!" }
   * });
   */
  updateCart(request: IUpdateCartRequest): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/UpdateCart`, request);
  }

  /**
   * Добавляет товар в корзину.
   *
   * @param {IAddToCartRequest} request Данные для добавления товара.
   * @returns {Observable<{ success: boolean; message: string }>} Результат добавления.
   * @example
   * // POST /api/ShopCart/AddToCart
   * // Body:
   * // {
   * //   "productId": 1,
   * //   "quantity": 2,
   * //   "sizeId": 2
   * // }
   * this.shopCartService.addToCart({
   *   productId: 1,
   *   quantity: 2,
   *   sizeId: 2
   * }).subscribe(res => {
   *   // res: { success: true, message: "Product added to cart." }
   * });
   */
  addToCart(request: IAddToCartRequest): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/AddToCart`, request);
  }

  /**
   * Получает текущее количество товара определённого размера в корзине.
   *
   * @param {number} productId Идентификатор товара.
   * @param {number} sizeId Идентификатор размера.
   * @returns {Observable<{ currentQuantity: number }>} Текущее количество.
   * @example
   * // GET /api/ShopCart/quantity?productId=1&sizeId=2
   * this.shopCartService.getCartQuantity(1, 2).subscribe(q => {
   *   // q: { currentQuantity: number }
   * });
   */
  getCartQuantity(productId: number, sizeId: number): Observable<{ currentQuantity: number }> {
    return this.http.get<{ currentQuantity: number }>(`${this.baseUrl}/quantity?productId=${productId}&sizeId=${sizeId}`);
  }

  /**
   * Оформляет заказ по содержимому корзины.
   *
   * @param {any[]} cart Массив товаров для оформления заказа.
   * @returns {Observable<{ orderId: number; orderDetails: IDpOrderDetail[] }>} Информация о заказе.
   * @example
   * // POST /api/ShopCart/Checkout
   * // Body:
   * // [
   * //   { "productId": 1, "quantity": 2, "sizeId": 2 },
   * //   { "productId": 3, "quantity": 1, "sizeId": 1 }
   * // ]
   * this.shopCartService.checkout([
   *   { productId: 1, quantity: 2, sizeId: 2 },
   *   { productId: 3, quantity: 1, sizeId: 1 }
   * ]).subscribe(order => {
   *   // order: { orderId: number, orderDetails: [...] }
   * });
   */
  checkout(cart: any[]): Observable<{ orderId: number; orderDetails: IDpOrderDetail[] }> {
    return this.http.post<{ orderId: number; orderDetails: IDpOrderDetail[] }>(`${this.baseUrl}/Checkout`, cart);
  }

  /**
   * Удаляет товар из корзины.
   *
   * @param {IRemoveFromCartRequest} request Данные для удаления товара.
   * @returns {Observable<void>} Результат удаления.
   * @example
   * this.shopCartService.removeFromCart({ productId: 1, sizeId: 2 }).subscribe(() => ...);
   */
  removeFromCart(request: IRemoveFromCartRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/RemoveFromCart`, request);
  }

  /**
   * Экспортирует заказ в Excel.
   *
   * @param {number} orderId Идентификатор заказа.
   * @returns {Observable<Blob>} Файл Excel.
   * @example
   * this.shopCartService.exportToExcel(123).subscribe(blob => {
   *   const url = URL.createObjectURL(blob);
   *   window.open(url);
   * });
   */
  exportToExcel(orderId: number): Observable<Blob> {
    return this.http.post(`${this.baseUrl}/export?orderId=${orderId}`, {}, { responseType: 'blob' });
  }
}