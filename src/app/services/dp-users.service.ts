import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpUser } from '../interface/IDpUser';

/**
 * Сервис для работы с пользователями (Users).
 *
 * @remarks
 * Позволяет получать, создавать, обновлять и удалять пользователей через API.
 */
@Injectable({
  providedIn: 'root'
})
export class DpUsersService {
  private baseUrl = `${window.location.origin}/api/DpUsers`;

  constructor(private http: HttpClient) {}

  /**
   * Получает список всех пользователей.
   *
   * @returns {Observable<IDpUser[]>} Список пользователей.
   * @example
   * // GET /api/DpUsers
   * this.dpUsersService.getAllDpUsers().subscribe(users => {
   *   // users: [{ dpUserId, userName, ... }]
   *   console.log(users);
   * });
   */
  getAllDpUsers(): Observable<IDpUser[]> {
    return this.http.get<IDpUser[]>(this.baseUrl);
  }

  /**
   * Получает пользователя по его идентификатору.
   *
   * @param {number} id Идентификатор пользователя.
   * @returns {Observable<IDpUser>} Пользователь.
   * @example
   * // GET /api/DpUsers/1
   * this.dpUsersService.getDpUserById(1).subscribe(user => {
   *   // user: { dpUserId, userName, ... }
   * });
   */
  getDpUserById(id: number): Observable<IDpUser> {
    return this.http.get<IDpUser>(`${this.baseUrl}/${id}`);
  }

  /**
   * Создаёт нового пользователя.
   *
   * @param {IDpUser} dpUser Объект пользователя.
   * @returns {Observable<IDpUser>} Созданный пользователь.
   * @example
   * // POST /api/DpUsers
   * // Body:
   * // {
   * //   "dpUserId": 0,
   * //   "userName": "Иван",
   * //   ...другие поля...
   * // }
   * this.dpUsersService.createDpUser({
   *   dpUserId: 0,
   *   userName: 'Иван'
   * }).subscribe(newUser => {
   *   // newUser: { ... }
   * });
   */
  createDpUser(dpUser: IDpUser): Observable<IDpUser> {
    return this.http.post<IDpUser>(this.baseUrl, dpUser);
  }

  /**
   * Обновляет существующего пользователя.
   *
   * @param {number} id Идентификатор пользователя.
   * @param {IDpUser} dpUser Обновлённый объект пользователя.
   * @returns {Observable<void>} Результат обновления.
   * @example
   * // PUT /api/DpUsers/1
   * // Body:
   * // {
   * //   "dpUserId": 1,
   * //   "userName": "Пётр",
   * //   ...другие поля...
   * // }
   * this.dpUsersService.updateDpUser(1, {
   *   dpUserId: 1,
   *   userName: 'Пётр'
   * }).subscribe(() => {
   *   // Пользователь обновлён
   * });
   */
  updateDpUser(id: number, dpUser: IDpUser): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, dpUser);
  }

  /**
   * Удаляет пользователя по идентификатору.
   *
   * @param {number} id Идентификатор пользователя.
   * @returns {Observable<void>} Результат удаления.
   * @example
   * // DELETE /api/DpUsers/1
   * this.dpUsersService.deleteDpUser(1).subscribe(() => {
   *   // Пользователь удалён
   * });
   */
  deleteDpUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
