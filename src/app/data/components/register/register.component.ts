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
import { UserAchievementsService } from '../../../services/user-achievements.service';
import { ConfigService } from '../../../services/config.service';
import { switchMap } from 'rxjs';

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
    username: new FormControl('', [Validators.required,]),
    password: new FormControl('', [Validators.required,]),
  });

  constructor(
    private authRepository: AuthRepositoryService,
    private userAchievementsService: UserAchievementsService,
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
        next: (response: { token: string; userProjId?: number; achievementId?: number }) => {
          console.log('Registration response:', response);

          if (response.token) {
            this.alertService.open('Регистрация успешна! Войдите в аккаунт.', { appearance: 'success' }).subscribe();
            const username = user.dpUsername;
            const userProjId = response.userProjId || parseInt(localStorage.getItem('userProjId') || '0', 10);
            const achievementId = this.configService.achievementIds.register;

            if (userProjId > 0) {
              this.userAchievementsService.checkUserAchievementExists(userProjId, achievementId).pipe(
                switchMap(exists => {
                  if (!exists) {
                    return this.userAchievementsService.createUserAchievement(userProjId, achievementId).pipe(
                      switchMap(() => this.userAchievementsService.unlockUserAchievement(userProjId, achievementId))
                    );
                  } else {
                    return this.userAchievementsService.unlockUserAchievement(userProjId, achievementId);
                  }
                })
              ).subscribe({
                next: () => {
                  this.alertService.open(`Достижение #${achievementId} разблокировано!`, { appearance: 'info' }).subscribe();
                },
                error: (err) => {
                  console.error(`Ошибка при разблокировке достижения ${achievementId} для userProjId ${userProjId}:`, err);
                }
              });
            } else {
              console.log('userProjId not found, checking achievements by username');
              this.userAchievementsService.getCompletedAchievementsByUsername(username).subscribe({
                next: (achievements) => {
                  console.log('Achievements for user:', achievements);
                },
                error: (err) => {
                  console.error('Ошибка при получении достижений:', err);
                }
              });
            }

            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          } else {
            this.alertService.open('Ошибка регистрации: некорректный ответ сервера', { appearance: 'error' }).subscribe();
          }
        },
        error: (error) => {
          console.error('Registration failed:', error);
          const errorMessage = error.error?.message || error.message || 'Ошибка регистрации: попробуйте другое имя пользователя';
          this.alertService.open(errorMessage, { appearance: 'error' }).subscribe();
        }
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
