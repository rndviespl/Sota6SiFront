import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { TuiLink } from '@taiga-ui/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}

  navigateTo(path: string): void {
    console.log('Navigating to:', path);
    this.router.navigate([path]);
  }
}