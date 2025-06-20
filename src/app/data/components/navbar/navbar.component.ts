import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { BackButtonComponent } from '../back-button/back-button.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { TuiLink, TuiIcon, TuiButton, TuiIconPipe } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TuiAvatar } from '@taiga-ui/kit';
import { UserAchievementsService } from '../../../services/user-achievements.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    FormsModule,
    TuiLink,
    TuiIcon,
    TuiButton,
    ThemeToggleComponent,
    BackButtonComponent,
    TuiAvatar,
    AsyncPipe,
    TuiIconPipe,
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css', '../../../styles/root.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  alwaysFailMode = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userAchievementsService: UserAchievementsService = inject(UserAchievementsService)
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
    this.checkAuthStatus();
    this.alwaysFailMode = this.userAchievementsService.getAlwaysFailMode();
  }

    toggleAlwaysFail() {
    this.userAchievementsService.setAlwaysFailMode(this.alwaysFailMode);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authService.setAuthenticated(false);
    this.router.navigate(['/']);
  }
  checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
    this.authService.setAuthenticated(this.isAuthenticated);
  }
}