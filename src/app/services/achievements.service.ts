import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAchievement } from '../interface/IAchievement';

/**
 * Сервис для работы с достижениями (Achievements).
 *
 * @remarks
 * Позволяет получать, создавать, обновлять и удалять достижения через API.
 *
 * @example
 * // Получить все достижения (GET):
 * GET /api/Achievements
 *
 * // Получить достижение по id (GET):
 * GET /api/Achievements/1
 *
 * // Создать достижение (POST):
 * POST /api/Achievements
 * Body:
 * {
 *   "achievementId": 0,
 *   "title": "Новое достижение",
 *   "textAchievement": "Описание достижения"
 * }
 *
 * // Обновить достижение (PUT):
 * PUT /api/Achievements/1
 * Body:
 * {
 *   "achievementId": 1,
 *   "title": "Обновлённое достижение",
 *   "textAchievement": "Новое описание"
 * }
 *
 * // Удалить достижение (DELETE):
 * DELETE /api/Achievements/1
 */
@Injectable({
  providedIn: 'root',
})
export class AchievementsService {
  private baseUrl = `${window.location.origin}/api/Achievements`;

  constructor(private http: HttpClient) {}

  /**
   * Получает список всех достижений.
   *
   * @returns {Observable<IAchievement[]>} Список достижений.
   * @example
   * // GET /api/Achievements
   * this.achievementsService.getAllAchievements().subscribe(list => console.log(list));
   */
  getAllAchievements(): Observable<IAchievement[]> {
    return this.http.get<IAchievement[]>(this.baseUrl);
  }

  /**
   * Получает достижение по его идентификатору.
   *
   * @param {number} id Идентификатор достижения.
   * @returns {Observable<IAchievement>} Достижение.
   * @example
   * // GET /api/Achievements/1
   * this.achievementsService.getAchievementById(1).subscribe(ach => ...);
   */
  getAchievementById(id: number): Observable<IAchievement> {
    return this.http.get<IAchievement>(`${this.baseUrl}/${id}`);
  }

  /**
   * Создаёт новое достижение.
   *
   * @param {IAchievement} achievement Объект достижения.
   * @returns {Observable<IAchievement>} Созданное достижение.
   * @example
   * // POST /api/Achievements
   * // Body:
   * // {
   * //   "achievementId": 0,
   * //   "title": "Новое достижение",
   * //   "textAchievement": "Описание достижения"
   * // }
   * this.achievementsService.createAchievement({
   *   achievementId: 0,
   *   title: 'Новое достижение',
   *   textAchievement: 'Описание достижения'
   * }).subscribe(newAch => ...);
   */
  createAchievement(achievement: IAchievement): Observable<IAchievement> {
    return this.http.post<IAchievement>(this.baseUrl, achievement);
  }

  /**
   * Обновляет существующее достижение.
   *
   * @param {number} id Идентификатор достижения.
   * @param {IAchievement} achievement Обновлённый объект достижения.
   * @returns {Observable<void>} Результат обновления.
   * @example
   * // PUT /api/Achievements/1
   * // Body:
   * // {
   * //   "achievementId": 1,
   * //   "title": "Обновлённое достижение",
   * //   "textAchievement": "Новое описание"
   * // }
   * this.achievementsService.updateAchievement(1, {
   *   achievementId: 1,
   *   title: 'Обновлённое достижение',
   *   textAchievement: 'Новое описание'
   * }).subscribe(() => ...);
   */
  updateAchievement(id: number, achievement: IAchievement): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, achievement);
  }

  /**
   * Удаляет достижение по идентификатору.
   *
   * @param {number} id Идентификатор достижения.
   * @returns {Observable<void>} Результат удаления.
   * @example
   * // DELETE /api/Achievements/1
   * this.achievementsService.deleteAchievement(1).subscribe(() => ...);
   */
  deleteAchievement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Разблокирует достижение по названию.
   *
   * @param {string} achievementTitle Название достижения.
   * @example
   * this.achievementsService.unlockAchievement('First Login');
   */
  unlockAchievement(achievementTitle: string): void {
    console.log(`Achievement unlocked: ${achievementTitle}`);
    // Здесь вы можете добавить логику для обновления состояния ачивки на сервере или локально
  }
}
