import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpProductAttribute } from '../interface/IDpProductAttribute';

/**
 * Сервис для работы с атрибутами товаров (Product Attributes).
 *
 * @remarks
 * Позволяет получать, создавать, обновлять и удалять атрибуты товаров через API.
 */
@Injectable({
  providedIn: 'root'
})
export class DpProductAttributesService {
  private baseUrl = `${window.location.origin}/api/DpProductAttributes`;

  constructor(private http: HttpClient) {}

  /**
   * Получает список всех атрибутов товаров.
   *
   * @returns {Observable<IDpProductAttribute[]>} Список атрибутов товаров.
   * @example
   * // GET /api/DpProductAttributes
   * this.dpProductAttributesService.getAllDpProductAttributes().subscribe(attrs => {
   *   // attrs: [{ dpAttributesId, dpProductId, dpSize, ... }]
   *   console.log(attrs);
   * });
   */
  getAllDpProductAttributes(): Observable<IDpProductAttribute[]> {
    return this.http.get<IDpProductAttribute[]>(this.baseUrl);
  }

  /**
   * Получает атрибут товара по его идентификатору.
   *
   * @param {number} id Идентификатор атрибута.
   * @returns {Observable<IDpProductAttribute>} Атрибут товара.
   * @example
   * // GET /api/DpProductAttributes/1
   * this.dpProductAttributesService.getDpProductAttributeById(1).subscribe(attr => {
   *   // attr: { dpAttributesId, dpProductId, dpSize, ... }
   * });
   */
  getDpProductAttributeById(id: number): Observable<IDpProductAttribute> {
    return this.http.get<IDpProductAttribute>(`${this.baseUrl}/${id}`);
  }

  /**
   * Создаёт новый атрибут товара.
   *
   * @param {IDpProductAttribute} dpProductAttribute Объект атрибута.
   * @returns {Observable<IDpProductAttribute>} Созданный атрибут.
   * @example
   * // POST /api/DpProductAttributes
   * // Body:
   * // {
   * //   "dpAttributesId": 0,
   * //   "dpProductId": 1,
   * //   "dpSize": "M",
   * //   "dpColor": "Red",
   * //   ...другие поля...
   * // }
   * this.dpProductAttributesService.createDpProductAttribute({
   *   dpAttributesId: 0,
   *   dpProductId: 1,
   *   dpSize: 'M',
   *   dpColor: 'Red'
   * }).subscribe(attr => {
   *   // attr: { ... }
   * });
   */
  createDpProductAttribute(dpProductAttribute: IDpProductAttribute): Observable<IDpProductAttribute> {
    return this.http.post<IDpProductAttribute>(this.baseUrl, dpProductAttribute);
  }

  /**
   * Обновляет существующий атрибут товара.
   *
   * @param {number} id Идентификатор атрибута.
   * @param {IDpProductAttribute} dpProductAttribute Обновлённый объект атрибута.
   * @returns {Observable<void>} Результат обновления.
   * @example
   * // PUT /api/DpProductAttributes/1
   * // Body:
   * // {
   * //   "dpAttributesId": 1,
   * //   "dpProductId": 1,
   * //   "dpSize": "L",
   * //   "dpColor": "Blue",
   * //   ...другие поля...
   * // }
   * this.dpProductAttributesService.updateDpProductAttribute(1, {
   *   dpAttributesId: 1,
   *   dpProductId: 1,
   *   dpSize: 'L',
   *   dpColor: 'Blue'
   * }).subscribe(() => {
   *   // Атрибут обновлён
   * });
   */
  updateDpProductAttribute(id: number, dpProductAttribute: IDpProductAttribute): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dpProductAttribute);
  }

  /**
   * Удаляет атрибут товара по идентификатору.
   *
   * @param {number} id Идентификатор атрибута.
   * @returns {Observable<void>} Результат удаления.
   * @example
   * // DELETE /api/DpProductAttributes/1
   * this.dpProductAttributesService.deleteDpProductAttribute(1).subscribe(() => {
   *   // Атрибут удалён
   * });
   */
  deleteDpProductAttribute(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
