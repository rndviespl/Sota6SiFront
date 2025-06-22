import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpUserProj } from '../interface/IDpUserProj';

/**
 * Сервис для работы с пользователями проектов (UserProjs).
 *
 * @remarks
 * Позволяет получать, создавать, обновлять и удалять пользователей проектов через API.
 */
@Injectable({
  providedIn: 'root'
})
export class DpUserProjsService {
  private baseUrl = `${window.location.origin}/api/DpUserProjs`;

  constructor(private http: HttpClient) {}

  /**
   * Получает список всех пользователей проектов.
   *
   * @returns {Observable<IDpUserProj[]>} Список пользователей проектов.
   * @example
   * // GET /api/DpUserProjs
   * this.dpUserProjsService.getAllDpUserProjs().subscribe(users => {
   *   // users: [{ dpUserProjId, userName, ... }]
   *   console.log(users);
   * });
   */
  getAllDpUserProjs(): Observable<IDpUserProj[]> {
    return this.http.get<IDpUserProj[]>(this.baseUrl);
  }

  /**
   * Получает пользователя проекта по его идентификатору.
   *
   * @param {number} id Идентификатор пользователя проекта.
   * @returns {Observable<IDpUserProj>} Пользователь проекта.
   * @example
   * // GET /api/DpUserProjs/1
   * this.dpUserProjsService.getDpUserProjById(1).subscribe(user => {
   *   // user: { dpUserProjId, userName, ... }
   * });
   */
  getDpUserProjById(id: number): Observable<IDpUserProj> {
    return this.http.get<IDpUserProj>(`${this.baseUrl}/${id}`);
  }

  /**
   * Создаёт нового пользователя проекта.
   *
   * @param {IDpUserProj} dpUserProj Объект пользователя проекта.
   * @returns {Observable<IDpUserProj>} Созданный пользователь проекта.
   * @example
   * // POST /api/DpUserProjs
   * // Body:
   * // {
   * //   "dpUserProjId": 0,
   * //   "userName": "Иван",
   * //   ...другие поля...
   * // }
   * this.dpUserProjsService.createDpUserProj({
   *   dpUserProjId: 0,
   *   userName: 'Иван'
   * }).subscribe(newUser => {
   *   // newUser: { ... }
   * });
   */
  createDpUserProj(dpUserProj: IDpUserProj): Observable<IDpUserProj> {
    return this.http.post<IDpUserProj>(this.baseUrl, dpUserProj);
  }

  /**
   * Обновляет существующего пользователя проекта.
   *
   * @param {number} id Идентификатор пользователя проекта.
   * @param {IDpUserProj} dpUserProj Обновлённый объект пользователя проекта.
   * @returns {Observable<void>} Результат обновления.
   * @example
   * // PUT /api/DpUserProjs/1
   * // Body:
   * // {
   * //   "dpUserProjId": 1,
   * //   "userName": "Пётр",
   * //   ...другие поля...
   * // }
   * this.dpUserProjsService.updateDpUserProj(1, {
   *   dpUserProjId: 1,
   *   userName: 'Пётр'
   * }).subscribe(() => {
   *   // Пользователь обновлён
   * });
   */
  updateDpUserProj(id: number, dpUserProj: IDpUserProj): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dpUserProj);
  }

  /**
   * Удаляет пользователя проекта по идентификатору.
   *
   * @param {number} id Идентификатор пользователя проекта.
   * @returns {Observable<void>} Результат удаления.
   * @example
   * // DELETE /api/DpUserProjs/1
   * this.dpUserProjsService.deleteDpUserProj(1).subscribe(() => {
   *   // Пользователь удалён
   * });
   */
  deleteDpUserProj(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
