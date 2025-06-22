import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpSize } from '../interface/IDpSize';

/**
 * Сервис для работы с размерами товаров (Sizes).
 *
 * @remarks
 * Позволяет получать, создавать, обновлять и удалять размеры товаров через API.
 */
@Injectable({
  providedIn: 'root'
})
export class DpSizesService {
  private baseUrl = `${window.location.origin}/api/DpSizes`;

  constructor(private http: HttpClient) {}

  /**
   * Получает список всех размеров.
   *
   * @returns {Observable<IDpSize[]>} Список размеров.
   * @example
   * // GET /api/DpSizes
   * this.dpSizesService.getAllDpSizes().subscribe(sizes => {
   *   // sizes: [{ sizeId, size, ... }]
   *   console.log(sizes);
   * });
   */
  getAllDpSizes(): Observable<IDpSize[]> {
    return this.http.get<IDpSize[]>(this.baseUrl);
  }

  /**
   * Получает размер по его идентификатору.
   *
   * @param {number} id Идентификатор размера.
   * @returns {Observable<IDpSize>} Размер.
   * @example
   * // GET /api/DpSizes/1
   * this.dpSizesService.getDpSizeById(1).subscribe(size => {
   *   // size: { sizeId, size, ... }
   * });
   */
  getDpSizeById(id: number): Observable<IDpSize> {
    return this.http.get<IDpSize>(`${this.baseUrl}/${id}`);
  }

  /**
   * Создаёт новый размер.
   *
   * @param {IDpSize} dpSize Объект размера.
   * @returns {Observable<IDpSize>} Созданный размер.
   * @example
   * // POST /api/DpSizes
   * // Body:
   * // {
   * //   "sizeId": 0,
   * //   "size": "XL"
   * // }
   * this.dpSizesService.createDpSize({
   *   sizeId: 0,
   *   size: 'XL'
   * }).subscribe(newSize => {
   *   // newSize: { sizeId, size }
   * });
   */
createDpSize(dpSize: IDpSize): Observable<IDpSize> {
    return this.http.post<IDpSize>(this.baseUrl, dpSize);
  }

  /**
   * Обновляет существующий размер.
   *
   * @param {number} id Идентификатор размера.
   * @param {IDpSize} dpSize Обновлённый объект размера.
   * @returns {Observable<void>} Результат обновления.
   * @example
   * // PUT /api/DpSizes/1
   * // Body:
   * // {
   * //   "sizeId": 1,
   * //   "size": "XXL"
   * // }
   * this.dpSizesService.updateDpSize(1, {
   *   sizeId: 1,
   *   size: 'XXL'
   * }).subscribe(() => {
   *   // Размер обновлён
   * });
   */
  updateDpSize(id: number, dpSize: IDpSize): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dpSize);
  }

  /**
   * Удаляет размер по идентификатору.
   *
   * @param {number} id Идентификатор размера.
   * @returns {Observable<void>} Результат удаления.
   * @example
   * // DELETE /api/DpSizes/1
   * this.dpSizesService.deleteDpSize(1).subscribe(() => {
   *   // Размер удалён
   * });
   */
  deleteDpSize(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}