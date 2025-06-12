import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProjService } from '../../../services/auth-proj.service';
import { CommonModule, AsyncPipe, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiTextfield, TuiButton, TuiLink, TuiIcon, TuiIconPipe } from '@taiga-ui/core';
import { TuiSlider, TuiDataListWrapper, TuiFiles, TuiAvatar } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { AchievmentsPageForUserComponent } from '../achievments-page-for-user/achievments-page-for-user.component';
import { UserAchievementsRepositoryService } from '../../../repositories/user-achievements-repository.service';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'app-user-page-proj',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiSelectModule,
    TuiSlider,
    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiButton,
    TuiDataListWrapper,
    AsyncPipe,
    NgIf,
    TuiFiles,
    TuiLink,
    AchievmentsPageForUserComponent
  ],
  templateUrl: './user-page-proj.component.html',
  styleUrl: './user-page-proj.component.css'
})
export class UserPageProjComponent {
  private readonly authProjService = inject(AuthProjService);
  private readonly router = inject(Router);
  private readonly userAchievementsRepository = inject(UserAchievementsRepositoryService);

  isProjAuthenticated: boolean = false;
  private logoutAttempt = 0;

  constructor(
    private readonly configService: ConfigService = inject(ConfigService)
  ) { }

  ngOnInit(): void {
    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);

    // Случайно определяем успех или ошибку (50/50)
    const isSuccess = Math.random() < 0.3;

    this.isProjAuthenticated = !!localStorage.getItem('projToken');
    this.authProjService.setAuthenticated(this.isProjAuthenticated);

    if (isSuccess) {
      this.userAchievementsRepository
        .handleAchievement(
          userProjId,
          this.configService.achievementIds.updateProfileSuccess,
          'Успешное обновление профиля'
        )
        .subscribe();
      // Можно добавить alert или другой способ уведомления
      // alert('Тест-кейс: успешное обновление профиля!');
    } else {
      this.userAchievementsRepository
        .handleAchievement(
          userProjId,
          this.configService.achievementIds.updateProfileFailed,
          'Ошибка обновления профиля!'
        )
        .subscribe();
      // alert('Тест-кейс: ошибка обновления профиля!');
    }
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    const token = localStorage.getItem('projToken');
    this.isProjAuthenticated = !!token;
    this.authProjService.setAuthenticated(this.isProjAuthenticated);
  }

  logoutProj(): void {
    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    this.logoutAttempt++;
    // 1 из 4 успешный, остальные — ошибка
    const isSuccess = this.logoutAttempt % 4 === 1;

    if (isSuccess) {
      this.userAchievementsRepository
        .handleAchievement(userProjId, this.configService.achievementIds.logoutProjSuccess, 'Успешный выход из проекта!')
        .subscribe();
    } else {
      this.userAchievementsRepository
        .handleAchievement(userProjId, this.configService.achievementIds.logoutProjFailed, 'Ошибка выхода из проекта!')
        .subscribe();
    }
    localStorage.removeItem('projToken');
    localStorage.removeItem('userProjId');
    this.authProjService.setAuthenticated(false);
    this.router.navigate(['/']);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}