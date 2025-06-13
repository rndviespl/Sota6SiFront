import { Component, ChangeDetectionStrategy, inject, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TuiButton, TuiTitle, TuiAlertService, TuiIcon, TuiIconPipe, TuiLink } from '@taiga-ui/core';
import { TuiAccordion, TuiAccordionItem, TuiAvatar } from '@taiga-ui/kit';
import { Subscription } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { ConfigService } from '../../../services/config.service';
import { UserAchievementsService } from '../../../services/user-achievements.service';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-about',
 imports: [
    CommonModule,
    TuiButton,
    TuiTitle,
    TuiAccordion,
    TuiAccordionItem,
    RouterLink,
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
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css', '../../../styles/root.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
private readonly userAchievementsService = inject(UserAchievementsService);
  private readonly configService = inject(ConfigService);
  private readonly alertService = inject(TuiAlertService);
  private readonly subscriptions = new Subscription();
 
  constructor(
    private router: Router,
  ) {}

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

 navigateTo(path: string): void {
    this.router.navigate([path]);
  }
  /**
   * Переходит на главную страницу
   */
  navigateToHome(): void {
    this.navigateTo('/');
  }
}