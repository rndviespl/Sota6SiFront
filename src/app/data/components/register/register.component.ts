// src/app/components/register/register.component.ts
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { AuthRepositoryService } from '../../../repositories/auth-repository.service';
import { IDpUser } from '../../../interface/IDpUser';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiAppearance, TuiButton, TuiError, TuiNotification, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { TuiAlertService } from '@taiga-ui/core';
import { ConfigService } from '../../../services/config.service';
import { UserAchievementsRepositoryService } from '../../../repositories/user-achievements-repository.service';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css', '../../../styles/root.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterComponent {
  protected readonly form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor(
    private authRepository: AuthRepositoryService,
    private userAchievementsRepository: UserAchievementsRepositoryService,
    private router: Router,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private configService: ConfigService
  ) {}

  onRegister() {
    if (this.form.valid) {
      const user: IDpUser = {
        dpUserId: 0,
        dpUsername: this.form.value.username || '',
        dpPassword: this.form.value.password || '',
        dpRegistrationDate: new Date(),
        dpPhoneNumber: '0000000000'
      };

      this.authRepository.register(user).subscribe({
        next: (response: { token: string; userProjId?: number }) => {
          if (response.token) {
            this.alertService.open('Регистрация успешна! Войдите в аккаунт.', { appearance: 'success' }).subscribe();
            const userProjId = response.userProjId || parseInt(localStorage.getItem('userProjId') || '0', 10);

            this.userAchievementsRepository
              .handleAchievement(userProjId, this.configService.achievementIds.registerSuccess, 'Достижение регистрации разблокировано!')
              .subscribe({
                complete: () => setTimeout(() => this.router.navigate(['/login']), 2000)
              });
          } else {
            this.alertService.open('Ошибка регистрации: некорректный ответ сервера', { appearance: 'error' }).subscribe();
          }
        },
        error: (error) => {
          const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
          this.userAchievementsRepository
            .handleAchievement(userProjId, this.configService.achievementIds.registerFailed, 'Достижение неудачной регистрации разблокировано!')
            .subscribe();

          let errorMessage = 'Ошибка регистрации: попробуйте другое имя пользователя';
          if (error.status === this.configService.httpStatusCodes.conflict) {
            errorMessage = 'Ошибка: имя пользователя уже занято';
          } else if (error.status === this.configService.httpStatusCodes.badRequest) {
            errorMessage = 'Ошибка: неверный формат данных';
          }

          this.alertService.open(errorMessage, { appearance: 'error' }).subscribe();
        }
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}