import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { IAchievement } from '../interface/IAchievement';
import { IUserHasAchievement } from '../interface/IUserHasAchievement';
import { ConfigService } from './config.service';
import { TuiAlertService } from '@taiga-ui/core';

@Injectable({
  providedIn: 'root'
})
export class UserAchievementsService {
  private baseUrl = `${window.location.origin}/api/UserAchievements`; // Убрали window.location.origin, используем прокси

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
    return this.http.get<boolean>(`${this.baseUrl}/Exists/${userProjId}/${achievementId}`)
      .pipe(
        catchError(error => {
          if (error.status === 404) {
            console.warn(`Достижение ${achievementId} или пользователь ${userProjId} не найдены`);
            return of(false); // Возвращаем false, если пользователь или достижение не существуют
          }
          console.error('Ошибка при проверке достижения:', error);
          return of(false);
        })
      );
  }

  /**
   * Универсальный метод для обработки достижения
   * @param userProjId Идентификатор пользователя проекта
   * @param achievementId Идентификатор достижения
   * @param successMessage Сообщение для уведомления
   * @returns Observable<void>
   */
  handleAchievement(
    userProjId: number,
    achievementId: number,
    successMessage: string
  ): Observable<void> {
    if (userProjId <= 0 || achievementId <= 0) {
      console.warn('Некорректный userProjId или achievementId:', { userProjId, achievementId });
      return of(void 0);
    }

    return this.checkUserAchievementExists(userProjId, achievementId).pipe(
      switchMap(exists => {
        if (exists) {
          console.log(`Достижение ${achievementId} уже выполнено для userProjId ${userProjId}`);
          return of(void 0); // Ничего не делаем, если достижение уже есть
        }
        return this.createUserAchievement(userProjId, achievementId).pipe(
          switchMap(() => this.unlockUserAchievement(userProjId, achievementId)),
          tap(() => {
            this.alertService.open(successMessage, { appearance: 'info' }).subscribe();
          })
        );
      }),
      catchError(error => {
        console.error(`Ошибка при обработке достижения ${achievementId} для userProjId ${userProjId}:`, error);
        this.alertService.open('Ошибка при обработке достижения. Попробуйте ещё раз!', { appearance: 'error' }).subscribe();
        return of(void 0);
      })
    );
  }
}