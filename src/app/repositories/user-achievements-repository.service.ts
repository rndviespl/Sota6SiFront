import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAchievement } from '../interface/IAchievement';
import { UserAchievementsService } from '../services/user-achievements.service';
import { IUserHasAchievement } from '../interface/IUserHasAchievement';
import { ConfigService } from '../services/config.service';

@Injectable({
  providedIn: 'root'
})
export class UserAchievementsRepositoryService {

  constructor(
    private userAchievementsService: UserAchievementsService,
    private configService: ConfigService
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
   * @param achievementKey Ключ достижения из ConfigService.achievementIds
   * @param successMessage Сообщение для уведомления
   * @returns Observable<void>
   */
  handleAchievement(
    userProjId: number,
    achievementKey: keyof typeof this.configService.achievementIds,
    successMessage: string
  ): Observable<void> {
    return this.userAchievementsService.handleAchievement(userProjId, achievementKey, successMessage);
  }
}