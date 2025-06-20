import { TUI_DARK_MODE, TuiLink, TuiRoot } from "@taiga-ui/core";
import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./data/components/navbar/navbar.component";
@Component({
  selector: 'app-root',
  imports: [  
    RouterOutlet, 
    TuiRoot, 
    RouterModule,
    TuiLink,
    NavbarComponent,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Sota6SiFront';
  protected readonly darkMode = inject(TUI_DARK_MODE);
}
