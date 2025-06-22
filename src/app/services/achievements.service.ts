import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAchievement } from '../interface/IAchievement';

/**
 * Сервис для работы с тест-кейсами (Achievements).
 *
 * @remarks
 * Позволяет получать, создавать, обновлять и удалять тест-кейсы через API.
 *
 * @example
 * // Получить все тест-кейсы (GET):
 * GET /api/Achievements
 *
 * // Получить тест-кейс по id (GET):
 * GET /api/Achievements/1
 *
 * // Создать тест-кейс (POST):
 * POST /api/Achievements
 * Body:
 * {
 *   "achievementId": 0,
 *   "title": "Новое достижение",
 *   "textAchievement": "Описание достижения"
 * }
 *
 * // Обновить тест-кейс (PUT):
 * PUT /api/Achievements/1
 * Body:
 * {
 *   "achievementId": 1,
 *   "title": "Обновлённое достижение",
 *   "textAchievement": "Новое описание"
 * }
 *
 * // Удалить тест-кейс (DELETE):
 * DELETE /api/Achievements/1
 */
@Injectable({
  providedIn: 'root',
})
export class AchievementsService {
  private baseUrl = `${window.location.origin}/api/Achievements`;

  constructor(private http: HttpClient) {}

  /**
   * Получает список всех тест-кейсов.
   *
   * @returns {Observable<IAchievement[]>} Список тест-кейсов.
   * @example
   * // GET /api/Achievements
   * this.achievementsService.getAllAchievements().subscribe(list => console.log(list));
   */
  getAllAchievements(): Observable<IAchievement[]> {
    return this.http.get<IAchievement[]>(this.baseUrl);
  }

  /**
   * Получает тест-кейс по его идентификатору.
   *
   * @param {number} id Идентификатор тест-кейса.
   * @returns {Observable<IAchievement>} Тест-кейс.
   * @example
   * // GET /api/Achievements/1
   * this.achievementsService.getAchievementById(1).subscribe(ach => ...);
   */
  getAchievementById(id: number): Observable<IAchievement> {
    return this.http.get<IAchievement>(`${this.baseUrl}/${id}`);
  }

  /**
   * Создаёт новый тест-кейс.
   *
   * @param {IAchievement} achievement Объект тест-кейса.
   * @returns {Observable<IAchievement>} Созданный тест-кейс.
   * @example
   * // POST /api/Achievements
   * // Body:
   * // {
   * //   "achievementId": 0,
   * //   "title": "Новый тест-кейс",
   * //   "textAchievement": "Описание тест-кейса"
   * // }
   * this.achievementsService.createAchievement({
   *   achievementId: 0,
   *   title: 'Новый тест-кейс',
   *   textAchievement: 'Описание тест-кейса'
   * }).subscribe(newAch => ...);
   */
  createAchievement(achievement: IAchievement): Observable<IAchievement> {
    return this.http.post<IAchievement>(this.baseUrl, achievement);
  }

  /**
   * Обновляет существующее тест-кейс.
   *
   * @param {number} id Идентификатор тест-кейса.
   * @param {IAchievement} achievement Обновлённый объект тест-кейса.
   * @returns {Observable<void>} Результат обновления.
   * @example
   * // PUT /api/Achievements/1
   * // Body:
   * // {
   * //   "achievementId": 1,
   * //   "title": "Обновлённый тест-кейс",
   * //   "textAchievement": "Новое описание"
   * // }
   * this.achievementsService.updateAchievement(1, {
   *   achievementId: 1,
   *   title: 'Обновлённый тест-кейс',
   *   textAchievement: 'Новое описание'
   * }).subscribe(() => ...);
   */
  updateAchievement(id: number, achievement: IAchievement): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, achievement);
  }

  /**
   * Удаляет тест-кейс по идентификатору.
   *
   * @param {number} id Идентификатор тест-кейса.
   * @returns {Observable<void>} Результат удаления.
   * @example
   * // DELETE /api/Achievements/1
   * this.achievementsService.deleteAchievement(1).subscribe(() => ...);
   */
  deleteAchievement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Разблокирует тест-кейс по названию.
   *
   * @param {string} achievementTitle Название тест-кейса.
   * @example
   * this.achievementsService.unlockAchievement('First Login');
   */
  unlockAchievement(achievementTitle: string): void {
    console.log(`test-case unlocked: ${achievementTitle}`);
    // Здесь вы можете добавить логику для обновления состояния тест-кейса на сервере или локально
  }
}
