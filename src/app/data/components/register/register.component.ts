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
  styleUrls: ['./register.component.css', 
  '../../../styles/root.css',],
schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class RegisterComponent {
  protected readonly form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private authRepository: AuthRepositoryService, private router: Router) {}

  onRegister() {
    if (this.form.valid) {
      const user: IDpUser = {
        dpUserId: 0,
        dpUsername: this.form.value.username || '',
        dpPassword: this.form.value.password || '',
        dpRegistrationDate: new Date(),
        dpPhoneNumber: '0000000000' // Default value if not provided
      };
  
      this.authRepository.register(user).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed:', error);
        }
      );
    }
  }
  

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}