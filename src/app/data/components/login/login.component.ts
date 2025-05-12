import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthRepositoryService } from '../../../repositories/auth-repository.service';
import { IDpUser } from '../../../interface/IDpUser';
import { CommonModule } from '@angular/common';
import { TuiInputModule } from '@taiga-ui/legacy';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiAppearance, TuiButton, TuiError, TuiNotification, TuiTextfield, TuiTitle } from '@taiga-ui/core';
import { TuiFieldErrorPipe } from '@taiga-ui/kit';
import { TuiCardLarge, TuiForm, TuiHeader } from '@taiga-ui/layout';
import { AuthService } from '../../../services/auth.service';

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
  styleUrls: ['./login.component.css', 
    '../../../styles/root.css',],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent {
  protected readonly form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private authRepository: AuthRepositoryService,
    private router: Router,
    private authService: AuthService
  ) {}

  onLogin() {
    if (this.form.valid) {
      const user: IDpUser = {
        dpUserId: 0,
        dpUsername: this.form.value.username || '',
        dpPassword: this.form.value.password || '',
        dpRegistrationDate: new Date(),
        dpPhoneNumber: '0000000000' // Default value if not provided
      };

      this.authRepository.login(user).subscribe(
        (response) => {
          console.log('Login successful:', response);
          if (response && response.token) {
            console.log('Token received:', response.token);
            localStorage.setItem('token', response.token);
            document.cookie = `token=${response.token}; path=/;`;
            this.authService.setAuthenticated(true);
            this.router.navigate(['/']);
          } else {
            console.error('Token not found in the response');
          }
        },
        (error) => {
          console.error('Login failed:', error);
        }
      );
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}