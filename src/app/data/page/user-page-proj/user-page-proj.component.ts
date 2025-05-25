import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthProjService } from '../../../services/auth-proj.service';
import { CommonModule, AsyncPipe, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiTextfield, TuiButton, TuiLink, TuiIcon, TuiIconPipe } from '@taiga-ui/core';
import { TuiSlider, TuiDataListWrapper, TuiFiles, TuiAvatar } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { DialogCategoryComponent } from '../../components/dialog-category/dialog-category.component';
import { DialogImageComponent } from '../../components/dialog-image/dialog-image.component';
import { DialogProductComponent } from '../../components/dialog-product/dialog-product.component';

@Component({
  selector: 'app-user-page-proj',
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiSelectModule,
    TuiSlider,
    TuiTextfield,
    TuiTextfieldControllerModule,
    TuiButton,
    TuiDataListWrapper,
    AsyncPipe,
    NgIf,
    TuiFiles,
    TuiLink,
  ],
  templateUrl: './user-page-proj.component.html',
  styleUrl: './user-page-proj.component.css'
})
export class UserPageProjComponent {
  private readonly authProjService = inject(AuthProjService);
  private readonly router = inject(Router);

  isProjAuthenticated: boolean = false;

  ngOnInit(): void {
    this.authProjService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isProjAuthenticated = isAuthenticated;
    });
    this.checkAuthStatus();
  }

  checkAuthStatus(): void {
    const token = localStorage.getItem('projToken');
    this.isProjAuthenticated = !!token;
    this.authProjService.setAuthenticated(this.isProjAuthenticated);
  }

  logoutProj(): void {
    localStorage.removeItem('projToken'); 
    localStorage.removeItem('userProjId');
    this.authProjService.setAuthenticated(false);
    this.router.navigate(['/']);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
