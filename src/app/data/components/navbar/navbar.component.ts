import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BackButtonComponent } from '../back-button/back-button.component';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { TuiLink } from '@taiga-ui/core';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule, 
    TuiLink, 
    ThemeToggleComponent, 
    BackButtonComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class NavbarComponent {
}