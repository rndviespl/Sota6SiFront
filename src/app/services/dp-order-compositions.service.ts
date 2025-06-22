import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpOrderComposition } from '../interface/IDpOrderComposition';

/**
 * Сервис для работы с составами заказов (Order Compositions).
 *
 * @remarks
 * Позволяет получать, создавать, обновлять и удалять составы заказов через API.
 *
 * @example
 * // Получить все составы заказов (GET):
 * // URL: /api/DpOrderCompositions
 * this.dpOrderCompositionsService.getAllDpOrderCompositions().subscribe(compositions => console.log(compositions));
 *
 * // Получить состав заказа по id (GET):
 * // URL: /api/DpOrderCompositions/1
 * this.dpOrderCompositionsService.getDpOrderCompositionById(1).subscribe(composition => {
 *   // composition: { dpOrderId, dpProductId, quantity, dpAttributes, dpOrder }
 * });
 *
 * // Создать состав заказа (POST):
 * // URL: /api/DpOrderCompositions
 * // Body:
 * // {
 * //   "dpOrderId": 1,
 * //   "dpProductId": 2,
 * //   "quantity": 3,
 * //   "dpAttributes": [],
 * //   "dpOrder": null
 * // }
 * this.dpOrderCompositionsService.createDpOrderComposition({
 *   dpOrderId: 1,
 *   dpProductId: 2,
 *   quantity: 3,
 *   dpAttributes: [],
 *   dpOrder: null
 * }).subscribe(newComp => {
 *   // newComp: { dpOrderId, dpProductId, quantity, ... }
 * });
 *
 * // Обновить состав заказа (PUT):
 * // URL: /api/DpOrderCompositions/1
 * // Body:
 * // {
 * //   "dpOrderId": 1,
 * //   "dpProductId": 2,
 * //   "quantity": 5,
 * //   "dpAttributes": [],
 * //   "dpOrder": null
 * // }
 * this.dpOrderCompositionsService.updateDpOrderComposition(1, {
 *   dpOrderId: 1,
 *   dpProductId: 2,
 *   quantity: 5,
 *   dpAttributes: [],
 *   dpOrder: null
 * }).subscribe(() => {
 *   // Состав заказа обновлён
 * });
 *
 * // Удалить состав заказа (DELETE):
 * // URL: /api/DpOrderCompositions/1
 * this.dpOrderCompositionsService.deleteDpOrderComposition(1).subscribe(() => {
 *   // Состав заказа удалён
 * });
 */
@Injectable({
  providedIn: 'root'
})
export class DpOrderCompositionsService {
  private baseUrl = `${window.location.origin}/api/DpOrderCompositions`;

  constructor(private http: HttpClient) {}

  /**
   * Получает список всех составов заказов.
   *
   * @returns {Observable<IDpOrderComposition[]>} Список составов заказов.
   * @example
   * // GET /api/DpOrderCompositions
   * this.dpOrderCompositionsService.getAllDpOrderCompositions().subscribe(compositions => {
   *   // compositions: [{ ... }]
   * });
   */
  getAllDpOrderCompositions(): Observable<IDpOrderComposition[]> {
    return this.http.get<IDpOrderComposition[]>(this.baseUrl);
  }

  /**
   * Получает состав заказа по его идентификатору.
   *
   * @param {number} id Идентификатор состава заказа.
   * @returns {Observable<IDpOrderComposition>} Состав заказа.
   * @example
   * // GET /api/DpOrderCompositions/1
   * this.dpOrderCompositionsService.getDpOrderCompositionById(1).subscribe(composition => {
   *   // composition: { ... }
   * });
   */
  getDpOrderCompositionById(id: number): Observable<IDpOrderComposition> {
    return this.http.get<IDpOrderComposition>(`${this.baseUrl}/${id}`);
  }

  /**
   * Создаёт новый состав заказа.
   *
   * @param {IDpOrderComposition} dpOrderComposition Объект состава заказа.
   * @returns {Observable<IDpOrderComposition>} Созданный состав заказа.
   * @example
   * // POST /api/DpOrderCompositions
   * // Body:
   * // {
   * //   "dpOrderId": 1,
   * //   "dpProductId": 2,
   * //   "quantity": 3,
   * //   "dpAttributes": [],
   * //   "dpOrder": null
   * // }
   * this.dpOrderCompositionsService.createDpOrderComposition({
   *   dpOrderId: 1,
   *   dpProductId: 2,
   *   quantity: 3,
   *   dpAttributes: [],
   *   dpOrder: null
   * }).subscribe(newComp => {
   *   // newComp: { ... }
   * });
   */
  createDpOrderComposition(dpOrderComposition: IDpOrderComposition): Observable<IDpOrderComposition> {
    return this.http.post<IDpOrderComposition>(this.baseUrl, dpOrderComposition);
  }

  /**
   * Обновляет существующий состав заказа.
   *
   * @param {number} id Идентификатор состава заказа.
   * @param {IDpOrderComposition} dpOrderComposition Обновлённый объект состава заказа.
   * @returns {Observable<void>} Результат обновления.
   * @example
   * // PUT /api/DpOrderCompositions/1
   * // Body:
   * // {
   * //   "dpOrderId": 1,
   * //   "dpProductId": 2,
   * //   "quantity": 5,
   * //   "dpAttributes": [],
   * //   "dpOrder": null
   * // }
   * this.dpOrderCompositionsService.updateDpOrderComposition(1, {
   *   dpOrderId: 1,
   *   dpProductId: 2,
   *   quantity: 5,
   *   dpAttributes: [],
   *   dpOrder: null
   * }).subscribe(() => {
   *   // Состав заказа обновлён
   * });
   */
  updateDpOrderComposition(id: number, dpOrderComposition: IDpOrderComposition): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dpOrderComposition);
  }

  /**
   * Удаляет состав заказа по идентификатору.
   *
   * @param {number} id Идентификатор состава заказа.
   * @returns {Observable<void>} Результат удаления.
   * @example
   * // DELETE /api/DpOrderCompositions/1
   * this.dpOrderCompositionsService.deleteDpOrderComposition(1).subscribe(() => {
   *   // Состав заказа удалён
   * });
   */
  deleteDpOrderComposition(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
