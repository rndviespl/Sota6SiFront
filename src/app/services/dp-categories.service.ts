import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpCategory } from '../interface/IDpCategory';

/**
 * Сервис для работы с категориями товаров.
 *
 * @remarks
 * Позволяет получать, создавать, обновлять и удалять категории товаров через API.
 *
 * @example
 * // Получить все категории (GET):
 * // URL: /api/DpCategories
 * this.dpCategoriesService.getAllDpCategories().subscribe(categories => console.log(categories));
 *
 * // Получить категорию по id (GET):
 * // URL: /api/DpCategories/1
 * this.dpCategoriesService.getDpCategoryById(1).subscribe(category => ...);
 *
 * // Создать категорию (POST):
 * // URL: /api/DpCategories
 * // Body:
 * // {
 * //   "dpCategoryId": 0,
 * //   "dpCategoryTitle": "Одежда",
 * //   "dpCategoryDescription": "Вся одежда"
 * // }
 * this.dpCategoriesService.createDpCategory({
 *   dpCategoryId: 0,
 *   dpCategoryTitle: 'Одежда',
 *   dpCategoryDescription: 'Вся одежда'
 * }).subscribe(newCategory => ...);
 *
 * // Обновить категорию (PUT):
 * // URL: /api/DpCategories/1
 * // Body:
 * // {
 * //   "dpCategoryId": 1,
 * //   "dpCategoryTitle": "Обновлённая категория",
 * //   "dpCategoryDescription": "Новое описание"
 * // }
 * this.dpCategoriesService.updateDpCategory(1, {
 *   dpCategoryId: 1,
 *   dpCategoryTitle: 'Обновлённая категория',
 *   dpCategoryDescription: 'Новое описание'
 * }).subscribe(() => ...);
 *
 * // Удалить категорию (DELETE):
 * // URL: /api/DpCategories/1
 * this.dpCategoriesService.deleteDpCategory(1).subscribe(() => ...);
 */
@Injectable({
  providedIn: 'root'
})
export class DpCategoriesService {
  private baseUrl = `${window.location.origin}/api/DpCategories`;

  constructor(private http: HttpClient) {}

  /**
   * Получает список всех категорий.
   *
   * @returns {Observable<IDpCategory[]>} Список категорий.
   * @example
   * // GET /api/DpCategories
   * this.dpCategoriesService.getAllDpCategories().subscribe(categories => ...);
   */
  getAllDpCategories(): Observable<IDpCategory[]> {
    return this.http.get<IDpCategory[]>(this.baseUrl);
  }

  /**
   * Получает категорию по её идентификатору.
   *
   * @param {number} id Идентификатор категории.
   * @returns {Observable<IDpCategory>} Категория.
   * @example
   * // GET /api/DpCategories/1
   * this.dpCategoriesService.getDpCategoryById(1).subscribe(category => ...);
   */
  getDpCategoryById(id: number): Observable<IDpCategory> {
    return this.http.get<IDpCategory>(`${this.baseUrl}/${id}`);
  }

  /**
   * Создаёт новую категорию.
   *
   * @param {IDpCategory} dpCategory Объект категории.
   * @returns {Observable<IDpCategory>} Созданная категория.
   * @example
   * // POST /api/DpCategories
   * // Body:
   * // {
   * //   "dpCategoryId": 0,
   * //   "dpCategoryTitle": "Одежда",
   * //   "dpCategoryDescription": "Вся одежда"
   * // }
   * this.dpCategoriesService.createDpCategory({
   *   dpCategoryId: 0,
   *   dpCategoryTitle: 'Одежда',
   *   dpCategoryDescription: 'Вся одежда'
   * }).subscribe(newCategory => ...);
   */
  createDpCategory(dpCategory: IDpCategory): Observable<IDpCategory> {
    return this.http.post<IDpCategory>(this.baseUrl, dpCategory);
  }

  /**
   * Обновляет существующую категорию.
   *
   * @param {number} id Идентификатор категории.
   * @param {IDpCategory} dpCategory Обновлённая категория.
   * @returns {Observable<void>} Результат обновления.
   * @example
   * // PUT /api/DpCategories/1
   * // Body:
   * // {
   * //   "dpCategoryId": 1,
   * //   "dpCategoryTitle": "Обновлённая категория",
   * //   "dpCategoryDescription": "Новое описание"
   * // }
   * this.dpCategoriesService.updateDpCategory(1, {
   *   dpCategoryId: 1,
   *   dpCategoryTitle: 'Обновлённая категория',
   *   dpCategoryDescription: 'Новое описание'
   * }).subscribe(() => ...);
   */
  updateDpCategory(id: number, dpCategory: IDpCategory): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dpCategory);
  }

  /**
   * Удаляет категорию по идентификатору.
   *
   * @param {number} id Идентификатор категории.
   * @returns {Observable<void>} Результат удаления.
   * @example
   * // DELETE /api/DpCategories/1
   * this.dpCategoriesService.deleteDpCategory(1).subscribe(() => ...);
   */
  deleteDpCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
