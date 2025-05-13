import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAchievement } from '../interface/IAchievement';

@Injectable({
  providedIn: 'root',
})
export class AchievementsService {
  private baseUrl = `${window.location.origin}/api/Achievements`;

  constructor(private http: HttpClient) {}

  getAllAchievements(): Observable<IAchievement[]> {
    return this.http.get<IAchievement[]>(this.baseUrl);
  }

  getAchievementById(id: number): Observable<IAchievement> {
    return this.http.get<IAchievement>(`${this.baseUrl}/${id}`);
  }

  createAchievement(achievement: IAchievement): Observable<IAchievement> {
    return this.http.post<IAchievement>(this.baseUrl, achievement);
  }

  updateAchievement(id: number, achievement: IAchievement): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, achievement);
  }

  deleteAchievement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Новый метод для разблокировки ачивки
  unlockAchievement(achievementTitle: string): void {
    console.log(`Achievement unlocked: ${achievementTitle}`);
    // Здесь вы можете добавить логику для обновления состояния ачивки на сервере или локально
  }
}
