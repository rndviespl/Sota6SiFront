import { Component, ChangeDetectionStrategy, inject, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButton, TuiTitle, TuiAlertService } from '@taiga-ui/core';
import { TuiAccordion, TuiAccordionItem } from '@taiga-ui/kit';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { UserAchievementsService } from '../../../services/user-achievements.service';

@Component({
  selector: 'app-about',
 imports: [
    CommonModule,
    TuiButton,
    TuiTitle,
    TuiAccordion,
    TuiAccordionItem,
    RouterLink
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
private readonly userAchievementsService = inject(UserAchievementsService);
  private readonly configService = inject(ConfigService);
  private readonly alertService = inject(TuiAlertService);
  private readonly subscriptions = new Subscription();

  ngOnInit(): void {
    this.recordNavigationAchievement();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Регистрирует достижение за переход на страницу "О нас"
   */
  private recordNavigationAchievement(): void {
    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    const sub = this.userAchievementsService
      .handleAchievement(
        userProjId,
        this.configService.achievementIds.navigateToAboutPageSuccess,
        'тест-кейс: Переход на страницу "О нас" выполнен!'
      )
      .subscribe({
        error: () => {
          // Ошибка обрабатывается в UserAchievementsService, включая navigateToAboutPageFailed
        }
      });
    this.subscriptions.add(sub);
  }

  /**
   * Переходит на главную страницу
   */
  navigateToHome(): void {
    // Реализация навигации, если нужно
  }
}