import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { TUI_DARK_MODE_KEY, TUI_DARK_MODE, TuiAlertService } from '@taiga-ui/core';
import { WA_LOCAL_STORAGE, WA_WINDOW } from '@ng-web-apis/common';
import { TuiSwitch } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserAchievementsRepositoryService } from '../../../repositories/user-achievements-repository.service';
import { ConfigService } from '../../../services/config.service';
import { UserAchievementsService } from '../../../services/user-achievements.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule, TuiSwitch, FormsModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css', '../../../styles/root.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThemeToggleComponent {
  private readonly key = inject(TUI_DARK_MODE_KEY);
  private readonly storage = inject(WA_LOCAL_STORAGE);
  private readonly media = inject(WA_WINDOW).matchMedia('(prefers-color-scheme: dark)');
  private readonly darkMode = inject(TUI_DARK_MODE);
  private readonly userAchievementsRepository = inject(UserAchievementsRepositoryService);
  private readonly userAchievementsService = inject(UserAchievementsService);
  private readonly alertService = inject(TuiAlertService);
  private readonly configService = inject(ConfigService);

  toggle = this.darkMode();
  private toggleCount = 0;

  constructor() {
    // Инициализация темы из локального хранилища, если она есть
    const savedTheme = this.storage.getItem(this.key);
    if (savedTheme) {
      this.toggle = savedTheme === 'true';
      this.darkMode.set(this.toggle);
      document.body.classList.toggle('dark-theme', this.toggle);
    }
  }

  toggleTheme(): void {
    this.toggle = !this.toggle;
    this.darkMode.set(this.toggle);
    document.body.classList.add('dark-theme');
    document.body.classList.toggle('dark-theme', this.toggle);
    this.storage.setItem(this.key, this.toggle.toString());

    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    this.toggleCount++;

    // Если включён режим "всегда ошибка" — всегда негативный тест-кейс
    if (this.userAchievementsService.getAlwaysFailMode()) {
      const achievementId = this.toggle
        ? this.configService.achievementIds.switchToDarkThemeFailed
        : this.configService.achievementIds.switchToLightThemeFailed;
      this.recordAchievement(userProjId, achievementId, `Тест-кейс: ошибка включения ${this.toggle ? 'тёмной' : 'светлой'} темы!`);
      this.alertService.open(`Тест-кейс: ошибка переключения темы на ${this.toggle ? 'тёмную' : 'светлую'}!`, { appearance: 'error' }).subscribe();
      return;
    }
    
    // Логика достижений: чередуем успех и ошибку
    if (this.toggleCount % 2 === 0) {
      // Успешное переключение темы
      const achievementId = this.toggle
        ? this.configService.achievementIds.switchToDarkThemeSuccess
        : this.configService.achievementIds.switchToLightThemeSuccess;
      this.recordAchievement(userProjId, achievementId, `Успешно включена ${this.toggle ? 'тёмная' : 'светлая'} тема!`);
      this.alertService.open(`Тема переключена на ${this.toggle ? 'тёмную' : 'светлую'}!`, { appearance: 'success' }).subscribe();
    } else {
      // Ошибка переключения темы
      const achievementId = this.toggle
        ? this.configService.achievementIds.switchToDarkThemeFailed
        : this.configService.achievementIds.switchToLightThemeFailed;
      this.recordAchievement(userProjId, achievementId, `Ошибка включения ${this.toggle ? 'тёмной' : 'светлой'} темы!`);
      this.alertService.open(`Ошибка переключения темы на ${this.toggle ? 'тёмную' : 'светлую'}!`, { appearance: 'error' }).subscribe();
    }
  }

  reset(): void {
    const systemTheme = this.media.matches;
    this.toggle = systemTheme;
    this.darkMode.set(systemTheme);
    this.storage.removeItem(this.key);
    this.toggleCount = 0;

    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    this.recordAchievement(
      userProjId,
      this.configService.achievementIds.resetThemeSuccess,
      'Тема сброшена к системной!'
    );
    this.alertService.open('Тема сброшена к системной!', { appearance: 'success' }).subscribe();
  }

  private recordAchievement(userProjId: number, achievementId: number, message: string): void {
    if (userProjId <= 0) {
      console.warn('Некорректный userProjId:', userProjId);
      return;
    }

    this.userAchievementsRepository.handleAchievement(userProjId, achievementId, message).subscribe({
      error: (err) => {
        console.error('Ошибка при записи достижения:', err);
      }
    });
  }
}
