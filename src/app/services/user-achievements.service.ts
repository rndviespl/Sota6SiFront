import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAchievement } from '../interface/IAchievement';
import { IUserHasAchievement } from '../interface/IUserHasAchievement';

@Injectable({
  providedIn: 'root'
})
export class UserAchievementsService {
  private baseUrl = `${window.location.origin}/api/UserAchievements`;

  constructor(private http: HttpClient) {}

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
}

