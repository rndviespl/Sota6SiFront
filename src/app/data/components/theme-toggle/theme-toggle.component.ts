import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { TUI_DARK_MODE_KEY, TUI_DARK_MODE } from '@taiga-ui/core';
import { WA_LOCAL_STORAGE, WA_WINDOW } from '@ng-web-apis/common';
import { TuiSwitch } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
import { UserAchievementsRepositoryService } from '../../../repositories/user-achievements-repository.service';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../../services/config.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule, TuiSwitch, FormsModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css', '../../../styles/root.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ThemeToggleComponent {
  private readonly key = inject(TUI_DARK_MODE_KEY);
  private readonly storage = inject(WA_LOCAL_STORAGE);
  private readonly media = inject(WA_WINDOW).matchMedia('(prefers-color-scheme: dark)');
  protected readonly darkMode = inject(TUI_DARK_MODE);
  private readonly userAchievementsRepository = inject(UserAchievementsRepositoryService);
 
  constructor(
    private readonly configService: ConfigService = inject(ConfigService)
  ) { }
  
  toggle = this.darkMode();
  private toggleCount = 0;

  toggleTheme(): void {
    this.toggle = !this.toggle;
    this.darkMode.set(this.toggle);
    document.body.classList.toggle('dark-theme', this.toggle);

    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    this.toggleCount++;

    // Через раз успех/ошибка
    if (this.toggleCount % 2 === 1) {
      if (this.toggle) {
        this.userAchievementsRepository.handleAchievement(userProjId, this.configService.achievementIds.switchToDarkThemeSuccess, 'тест-кейс: Успешно включена тёмная тема!').subscribe();
      } else {
        this.userAchievementsRepository.handleAchievement(userProjId, this.configService.achievementIds.switchToLightThemeSuccess, 'тест-кейс: Успешно включена светлая тема!').subscribe();
      }
      this.userAchievementsRepository.handleAchievement(userProjId, this.configService.achievementIds.toggleThemeSuccess, 'тест-кейс: Тема успешно переключена!').subscribe();
    } else {
      if (this.toggle) {
        this.userAchievementsRepository.handleAchievement(userProjId, this.configService.achievementIds.switchToDarkThemeFailed, 'тест-кейс: Ошибка включения тёмной темы!').subscribe();
      } else {
        this.userAchievementsRepository.handleAchievement(userProjId, this.configService.achievementIds.switchToLightThemeFailed, 'тест-кейс: Ошибка включения светлой темы!').subscribe();
      }
    }
  }

  protected reset(): void {
    this.darkMode.set(this.media.matches);
    this.storage.removeItem(this.key);

    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    this.userAchievementsRepository.handleAchievement(userProjId, this.configService.achievementIds.resetThemeSuccess, 'тест-кейс: Тема сброшена к системной!').subscribe();
  }
}