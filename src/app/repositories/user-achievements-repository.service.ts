import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAchievement } from '../interface/IAchievement';
import { IUserHasAchievement } from '../interface/IUserHasAchievement';
import { UserAchievementsService } from '../services/user-achievements.service';

@Injectable({
  providedIn: 'root'
})
export class UserAchievementsRepositoryService {
  constructor(
    private userAchievementsService: UserAchievementsService
  ) {}

  getAllUserAchievements(): Observable<IUserHasAchievement[]> {
    return this.userAchievementsService.getAllUserAchievements();
  }

  getUserAchievement(userProjId: number, achievementId: number): Observable<IUserHasAchievement> {
    return this.userAchievementsService.getUserAchievement(userProjId, achievementId);
  }

  createUserAchievement(userProjId: number, achievementId: number): Observable<IUserHasAchievement> {
    return this.userAchievementsService.createUserAchievement(userProjId, achievementId);
  }

  unlockUserAchievement(userProjId: number, achievementId: number): Observable<void> {
    return this.userAchievementsService.unlockUserAchievement(userProjId, achievementId);
  }

  getCompletedAchievementsByUsername(username: string): Observable<IAchievement[]> {
    return this.userAchievementsService.getCompletedAchievementsByUsername(username);
  }

  /**
   * Универсальный метод для обработки достижения
   * @param userProjId Идентификатор пользователя
   * @param achievementId Идентификатор достижения
   * @param successMessage Сообщение для уведомления
   * @returns Observable<void>
   */
  handleAchievement(
    userProjId: number,
    achievementId: number,
    successMessage: string
  ): Observable<void> {
    return this.userAchievementsService.handleAchievement(userProjId, achievementId, successMessage);
  }
}