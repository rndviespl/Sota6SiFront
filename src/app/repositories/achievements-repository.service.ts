import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAchievement } from '../interface/IAchievement';
import { AchievementsService } from '../services/achievements.service';

@Injectable({
  providedIn: 'root'
})

export class AchievementsRepositoryService {
  constructor(private achievementsService: AchievementsService) {}

  getAllAchievements(): Observable<IAchievement[]> {
    return this.achievementsService.getAllAchievements();
  }

  getAchievementById(id: number): Observable<IAchievement> {
    return this.achievementsService.getAchievementById(id);
  }

  createAchievement(achievement: IAchievement): Observable<IAchievement> {
    return this.achievementsService.createAchievement(achievement);
  }

  updateAchievement(id: number, achievement: IAchievement): Observable<void> {
    return this.achievementsService.updateAchievement(id, achievement);
  }

  deleteAchievement(id: number): Observable<void> {
    return this.achievementsService.deleteAchievement(id);
  }
}
