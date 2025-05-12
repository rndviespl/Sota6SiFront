import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { TuiLink } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule, 
    TuiLink, 
    ThemeToggleComponent, 
    BackButtonComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css',
    '../../../styles/root.css',],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NavbarComponent {
  isAuthenticated: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

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
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Remove token from cookies
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Update authentication status
    this.authService.setAuthenticated(false);
    // Navigate to the home page
    this.router.navigate(['/']);
  }

  checkAuthStatus(): void {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
    this.authService.setAuthenticated(this.isAuthenticated);
  }
}