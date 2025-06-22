import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { AuthProjService } from '../../../services/auth-proj.service';
import { IDpUserProj } from '../../../interface/IDpUserProj';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiAppearance, TuiButton, TuiError, TuiNotification, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { TuiAlertService } from '@taiga-ui/core';
import { AuthProjRepositoryService } from '../../../repositories/auth-proj-repository.service';

/**
 * @ignore
 */
@Component({
  selector: 'app-register-proj',
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
  templateUrl: './register-proj.component.html',
  styleUrls: ['./register-proj.component.css', '../../../styles/root.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterProjComponent {
  protected readonly form = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private authProjRepository: AuthProjRepositoryService,
    private router: Router,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {}

  onRegister() {
    if (this.form.valid) {
      const userProj: IDpUserProj = {
        dpUserProjId: 0,
        login: this.form.value.login || '',
        password: this.form.value.password || ''
      };

      this.authProjRepository.register(userProj).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          if (response && response.token) {
            this.alertService.open('Регистрация успешна! Войдите в аккаунт.', { appearance: 'success' }).subscribe();
            this.router.navigate(['/login-proj']);
          }
        },
        error: (error) => {
          console.error('Registration failed:', error);
          const errorMessage = error.error?.message || 'Ошибка регистрации: попробуйте другое имя пользователя';
          this.alertService.open(errorMessage, { appearance: 'error' }).subscribe();
        }
      });
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login-proj']);
  }
}