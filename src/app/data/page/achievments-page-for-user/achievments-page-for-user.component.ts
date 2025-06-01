import { Component, OnInit } from '@angular/core';
import { IAchievement } from '../../../interface/IAchievement';
import { UserAchievementsRepositoryService } from '../../../repositories/user-achievements-repository.service';
import { ConfigService } from '../../../services/config.service';
import { CommonModule } from '@angular/common';
import { AchievementsRepositoryService } from '../../../repositories/achievements-repository.service';
import { TuiTable } from '@taiga-ui/addon-table';
import { TuiScrollable, TuiScrollbar } from '@taiga-ui/core';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';


@Component({
  selector: 'app-achievments-page-for-user',
  imports: [CommonModule, CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    TuiScrollable,
    TuiScrollbar,
    TuiTable,],
  templateUrl: './achievments-page-for-user.component.html',
  styleUrls: ['./achievments-page-for-user.component.css', '../../../styles/root.css']
})
export class AchievmentsPageForUserComponent implements OnInit {
  allAchievements: IAchievement[] = [];
  completedAchievementIds: number[] = [];
  username: string = '';
  userId: number | null = null;

  constructor(
    private configService: ConfigService,
    private userAchievementsRepo: UserAchievementsRepositoryService,
    private achievementsRepo: AchievementsRepositoryService
  ) { }

  ngOnInit(): void {
    const projToken = localStorage.getItem('projToken');
    console.log('[Achievements] projToken:', projToken);

    if (projToken) {
      try {
        const payload = JSON.parse(atob(projToken.split('.')[1]));
        this.username = payload.sub; // <-- логин пользователя
        console.log('Username (login) from token:', this.username);
      } catch (e) {
        console.error('Ошибка при декодировании токена:', e);
        this.username = '';
      }
    } else {
      console.warn('[Achievements] projToken не найден в localStorage');
      this.username = '';
    }

    const idStr = localStorage.getItem('userProjId');
    this.userId = idStr ? Number(idStr) : null;
    console.log('[Achievements] userId:', this.userId);

    // Получаем все ачивки с описаниями из репозитория
    this.achievementsRepo.getAllAchievements().subscribe({
      next: (achievements: IAchievement[]) => {
        const validIds = Object.values(this.configService.achievementIds);
        this.allAchievements = achievements.filter(a => validIds.includes(a.achievementId));
        console.log('[Achievements] Загружены все ачивки:', this.allAchievements);
      },
      error: (err) => {
        console.error('[Achievements] Ошибка при получении всех ачивок:', err);
      }
    });

    // Получаем список завершённых ачивок пользователя
    if (this.username) {
      this.userAchievementsRepo.getCompletedAchievementsByUsername(this.username)
        .subscribe({
          next: (achievements: IAchievement[]) => {
            this.completedAchievementIds = achievements.map(a => a.achievementId);
            console.log('[Achievements] Выполненные ачивки пользователя:', this.completedAchievementIds);
          },
          error: (err) => {
            console.error('[Achievements] Ошибка при получении выполненных ачивок пользователя:', err);
          }
        });
    } else {
      console.warn('[Achievements] Не удалось получить выполненные ачивки: username пустой');
    }
  }

  isCompleted(achievementId: number): boolean {
    return this.completedAchievementIds.includes(achievementId);
  }
}