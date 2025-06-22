// src/app/components/login/login.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Inject } from '@angular/core';
import { AuthRepositoryService } from '../../../repositories/auth-repository.service';
import { IDpUser } from '../../../interface/IDpUser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiAppearance, TuiButton, TuiError, TuiNotification, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { AuthService } from '../../../services/auth.service';
import { TuiAlertService } from '@taiga-ui/core';
import { ConfigService } from '../../../services/config.service';
import { UserAchievementsRepositoryService } from '../../../repositories/user-achievements-repository.service';
import { UserAchievementsService } from '../../../services/user-achievements.service';

/**
 * @ignore
 */
@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiError,
    TuiFieldErrorPipe,
    TuiForm,
    TuiHeader,
    TuiNotification,
    TuiTextfield,
    TuiTitle,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../../styles/root.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {
  protected readonly form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authRepository: AuthRepositoryService,
    private userAchievementsRepository: UserAchievementsRepositoryService,
    private userAchievementsService: UserAchievementsService = inject(UserAchievementsService),
    private router: Router,
    private authService: AuthService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private configService: ConfigService
  ) { }

  onLogin() {
    if (this.form.valid) {
      const user: IDpUser = {
        dpUserId: 0,
        dpUsername: this.form.value.username || '',
        dpPassword: this.form.value.password || '',
        dpRegistrationDate: new Date(),
        dpPhoneNumber: '0000000000'
      };
      // Проверка: если включён режим "всегда ошибка" — только негативный тест-кейс
      if (this.userAchievementsService.getAlwaysFailMode()) {
        const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.loginFailed, 'тест-кейс неудачного входа разблокировано!')
          .subscribe();
        this.alertService.open('Тест-кейс: ошибка входа (режим всегда ошибка включён)', { appearance: 'error' }).subscribe();
        return;
      }
      
      this.authRepository.login(user).subscribe({
        next: (response) => {
          if (response && response.token) {
            this.alertService.open('Успешный вход!', { appearance: 'success' }).subscribe();
            localStorage.setItem('token', response.token);

            const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
            this.userAchievementsRepository
              .handleAchievement(userProjId, this.configService.achievementIds.loginSuccess, 'тест-кейс входа разблокировано!')
              .subscribe({
                complete: () => this.router.navigate(['/'])
              });
          }
        },
        error: (error) => {
          const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
          this.userAchievementsRepository
            .handleAchievement(userProjId, this.configService.achievementIds.loginFailed, 'тест-кейс неудачного входа разблокировано!')
            .subscribe();

          let errorMessage = 'Ошибка входа: неверное имя пользователя или пароль';
          if (error.status === this.configService.httpStatusCodes.unauthorized) {
            errorMessage = 'Ошибка: неверные учетные данные';
          } else if (error.status === this.configService.httpStatusCodes.serverError) {
            errorMessage = 'Ошибка сервера, попробуйте позже';
          }

          this.alertService.open(errorMessage, { appearance: 'error' }).subscribe();
        }
      });
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}