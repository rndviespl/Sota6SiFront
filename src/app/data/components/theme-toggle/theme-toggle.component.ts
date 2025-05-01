import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { TUI_DARK_MODE_KEY, TUI_DARK_MODE } from '@taiga-ui/core';
import {WA_LOCAL_STORAGE, WA_WINDOW} from '@ng-web-apis/common';
import { TuiSwitch } from '@taiga-ui/kit';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule,
TuiSwitch,
FormsModule
  ],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.css',
    '../../../styles/root.css',],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ThemeToggleComponent {
  private readonly key = inject(TUI_DARK_MODE_KEY);
  private readonly storage = inject(WA_LOCAL_STORAGE);
  private readonly media = inject(WA_WINDOW).matchMedia('(prefers-color-scheme: dark)');

  protected readonly darkMode = inject(TUI_DARK_MODE);
  toggle = this.darkMode();

  toggleTheme(): void {
    this.darkMode.set(this.toggle);
    document.body.classList.toggle('dark-theme', this.toggle);
  }

  protected reset(): void {
      this.darkMode.set(this.media.matches);
      this.storage.removeItem(this.key);
  }
}