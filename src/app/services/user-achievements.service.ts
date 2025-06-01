// src/app/services/user-achievements.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { IAchievement } from '../interface/IAchievement';
import { IUserHasAchievement } from '../interface/IUserHasAchievement';
import { ConfigService } from './config.service';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class UserAchievementsService {
  private baseUrl = `${window.location.origin}/api/UserAchievements`;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private alertService: TuiAlertService
  ) { }

  getAllUserAchievements(): Observable<IUserHasAchievement[]> {
    return this.http.get<IUserHasAchievement[]>(this.baseUrl);
  }

  getUserAchievement(userProjId: number, achievementId: number): Observable<IUserHasAchievement> {
    return this.http.get<IUserHasAchievement>(`${this.baseUrl}/${userProjId}/${achievementId}`);
  }

  createUserAchievement(userProjId: number, achievementId: number): Observable<IUserHasAchievement> {
    return this.http.post<IUserHasAchievement>(`${this.baseUrl}/Create/${userProjId}/${achievementId}`, {});
  }

  unlockUserAchievement(userProjId: number, achievementId: number): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/Unlock/${userProjId}/${achievementId}`, {});
  }

  getCompletedAchievementsByUsername(username: string): Observable<IAchievement[]> {
    return this.http.get<IAchievement[]>(`${this.baseUrl}/Completed/${username}`);
  }

  checkUserAchievementExists(userProjId: number, achievementId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/Exists/${userProjId}/${achievementId}`);
  }

  /**
   * Универсальный метод для обработки достижения (создание и разблокировка)
   * @param userProjId Идентификатор пользователя
   * @param achievementKey Ключ достижения из ConfigService.achievementIds
   * @param successMessage Сообщение для уведомления при успешной разблокировке
   * @returns Observable<void>
   */
  handleAchievement(
    userProjId: number,
    achievementKey: keyof typeof this.configService.achievementIds,
    successMessage: string
  ): Observable<void> {
    if (userProjId <= 0) {
      console.warn('Invalid userProjId, skipping achievement handling');
      return of(void 0);
    }

    const achievementId = this.configService.achievementIds[achievementKey];

    return this.checkUserAchievementExists(userProjId, achievementId).pipe(
      switchMap(exists => {
        if (!exists) {
          return this.createUserAchievement(userProjId, achievementId).pipe(
            switchMap(() => this.unlockUserAchievement(userProjId, achievementId))
          );
        }
        return this.unlockUserAchievement(userProjId, achievementId);
      }),
      switchMap(() => {
        this.alertService.open(successMessage, { appearance: 'info' }).subscribe();
        return of(void 0);
      }),
      catchError(error => {
        console.error(`Failed to handle achievement ${achievementId} for userProjId ${userProjId}:`, error);
        this.alertService.open('Ошибка при обработке достижения', { appearance: 'error' }).subscribe();
        return of(void 0);
      })
    );
  }
}
