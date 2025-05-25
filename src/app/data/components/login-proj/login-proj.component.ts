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

@Component({
  selector: 'app-login-proj',
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
  templateUrl: './login-proj.component.html',
  styleUrls: ['./login-proj.component.css', '../../../styles/root.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginProjComponent {
  protected readonly form = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authProjRepository: AuthProjRepositoryService,
    private router: Router,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) { }

  onLogin() {
    if (this.form.valid) {
      const userProj: IDpUserProj = {
        dpUserProjId: 0,
        login: this.form.value.login || '',
        password: this.form.value.password || '',
      };

      this.authProjRepository.login(userProj).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          if (response && response.token) {
            this.alertService.open('Успешный вход!', { appearance: 'success' }).subscribe();
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.alertService.open('Ошибка входа: неверный логин или пароль', { appearance: 'error' }).subscribe();
        }
      });
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register-proj']);
  }
}