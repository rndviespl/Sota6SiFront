import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
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
import { UserAchievementsService } from '../../../services/user-achievements.service';
import { catchError, of, switchMap, throwError } from 'rxjs';

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
    username: new FormControl('', [Validators.required, ]),
    password: new FormControl('', [Validators.required, ]),
  });

 constructor(
    private authRepository: AuthRepositoryService,
    private userAchievementsService: UserAchievementsService,
    private router: Router,
    private authService: AuthService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {}

  onLogin() {
    if (this.form.valid) {
      const user: IDpUser = {
        dpUserId: 0,
        dpUsername: this.form.value.username || '',
        dpPassword: this.form.value.password || '',
        dpRegistrationDate: new Date(),
        dpPhoneNumber: '0000000000'
      };

      this.authRepository.login(user).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          if (response && response.token) {
            this.alertService.open('Успешный вход!', { appearance: 'success' }).subscribe();
            const username = user.dpUsername;
            const userProjId = response.userProjId || parseInt(localStorage.getItem('userProjId') || '0', 10);
            const achievementId = 3;

            if (userProjId > 0) {
              this.userAchievementsService.checkUserAchievementExists(userProjId, achievementId).pipe(
                switchMap(exists => {
                  if (!exists) {
                    return this.userAchievementsService.createUserAchievement(userProjId, achievementId).pipe(
                      switchMap(() => this.userAchievementsService.unlockUserAchievement(userProjId, achievementId))
                    );
                  }
                  return this.userAchievementsService.unlockUserAchievement(userProjId, achievementId);
                }),
                catchError(error => {
                  console.error('Error handling achievement:', error);
                  return of(null); // Continue without blocking
                })
              ).subscribe({
                next: () => {
                  this.alertService.open(`Достижение #${achievementId} разблокировано!`, { appearance: 'info' }).subscribe();
                },
                error: (err) => console.error(`Failed to unlock achievement ${achievementId} for userProjId ${userProjId}:`, err)
              });
            } else {
              console.log('userProjId not found, skipping achievement unlock');
            }

            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.alertService.open('Ошибка входа: неверное имя пользователя или пароль', { appearance: 'error' }).subscribe();
        }
      });
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}