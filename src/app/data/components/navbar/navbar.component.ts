import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BackButtonComponent } from '../back-button/back-button.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { TuiLink, TuiIcon, TuiButton, TuiIconPipe } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TuiDialogService } from '@taiga-ui/core';
import { UserPageComponent } from '../../page/user-page/user-page.component';
import { TuiAvatar } from '@taiga-ui/kit';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    TuiLink,
    TuiIcon,
    TuiButton,
    ThemeToggleComponent,
    BackButtonComponent,
    TuiAvatar,
    AsyncPipe,
    TuiIconPipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../../styles/root.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NavbarComponent {
  isAuthenticated: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private dialogService: TuiDialogService
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    this.checkAuthStatus();
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    localStorage.removeItem('token');
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    this.authService.setAuthenticated(false);
    this.router.navigate(['/']);
  }

  checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
    this.authService.setAuthenticated(this.isAuthenticated);
  }
}
