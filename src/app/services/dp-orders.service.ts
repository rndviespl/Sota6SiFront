import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpOrder } from '../interface/IDpOrder';

/**
 * Сервис для работы с заказами (Orders).
 *
 * @remarks
 * Позволяет получать, создавать, обновлять и удалять заказы через API.
 */
@Injectable({
  providedIn: 'root'
})
export class DpOrdersService {
  private baseUrl = `${window.location.origin}/api/DpOrders`;

  constructor(private http: HttpClient) {}

  /**
   * Получает список всех заказов.
   *
   * @returns {Observable<IDpOrder[]>} Список заказов.
   * @example
   * // GET /api/DpOrders
   * this.dpOrdersService.getAllDpOrders().subscribe(orders => {
   *   // orders: [{ dpOrderId, dpUserId, orderDate, orderStatus, ... }]
   *   console.log(orders);
   * });
   */
  getAllDpOrders(): Observable<IDpOrder[]> {
    return this.http.get<IDpOrder[]>(this.baseUrl);
  }

  /**
   * Получает заказ по его идентификатору.
   *
   * @param {number} id Идентификатор заказа.
   * @returns {Observable<IDpOrder>} Заказ.
   * @example
   * // GET /api/DpOrders/1
   * this.dpOrdersService.getDpOrderById(1).subscribe(order => {
   *   // order: { dpOrderId, dpUserId, orderDate, orderStatus, ... }
   * });
   */
  getDpOrderById(id: number): Observable<IDpOrder> {
    return this.http.get<IDpOrder>(`${this.baseUrl}/${id}`);
  }

  /**
   * Создаёт новый заказ.
   *
   * @param {IDpOrder} dpOrder Объект заказа.
   * @returns {Observable<IDpOrder>} Созданный заказ.
   * @example
   * // POST /api/DpOrders
   * // Body:
   * // {
   * //   "dpOrderId": 0,
   * //   "dpUserId": 1,
   * //   "orderDate": "2025-06-22T12:00:00",
   * //   "orderStatus": "Новый"
   * // }
   * this.dpOrdersService.createDpOrder({
   *   dpOrderId: 0,
   *   dpUserId: 1,
   *   orderDate: new Date().toISOString(),
   *   orderStatus: 'Новый'
   * }).subscribe(newOrder => {
   *   // newOrder: { dpOrderId, dpUserId, orderDate, orderStatus, ... }
   * });
   */
  createDpOrder(dpOrder: IDpOrder): Observable<IDpOrder> {
    return this.http.post<IDpOrder>(this.baseUrl, dpOrder);
  }

  /**
   * Обновляет существующий заказ.
   *
   * @param {number} id Идентификатор заказа.
   * @param {IDpOrder} dpOrder Обновлённый объект заказа.
   * @returns {Observable<void>} Результат обновления.
   * @example
   * // PUT /api/DpOrders/1
   * // Body:
   * // {
   * //   "dpOrderId": 1,
   * //   "dpUserId": 1,
   * //   "orderDate": "2025-06-22T12:00:00",
   * //   "orderStatus": "Обновлён"
   * // }
   * this.dpOrdersService.updateDpOrder(1, {
   *   dpOrderId: 1,
   *   dpUserId: 1,
   *   orderDate: new Date().toISOString(),
   *   orderStatus: 'Обновлён'
   * }).subscribe(() => {
   *   // Заказ обновлён
   * });
   */
  updateDpOrder(id: number, dpOrder: IDpOrder): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dpOrder);
  }

  /**
   * Удаляет заказ по идентификатору.
   *
   * @param {number} id Идентификатор заказа.
   * @returns {Observable<void>} Результат удаления.
   * @example
   * // DELETE /api/DpOrders/1
   * this.dpOrdersService.deleteDpOrder(1).subscribe(() => {
   *   // Заказ удалён
   * });
   */
  deleteDpOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
