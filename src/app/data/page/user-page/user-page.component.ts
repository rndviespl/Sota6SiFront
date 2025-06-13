import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { DialogCategoryComponent } from "../../components/dialog-category/dialog-category.component";
import { DialogImageComponent } from "../../components/dialog-image/dialog-image.component";
import { DialogProductComponent } from "../../components/dialog-product/dialog-product.component";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiButton, TuiDialogService, TuiIcon, TuiIconPipe, TuiLink, TuiTextfield } from '@taiga-ui/core';
import { TuiAvatar, TuiDataListWrapper, TuiFiles, TuiSlider } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { tuiDialog } from '@taiga-ui/core';
import { IDpCategory } from '../../../interface/IDpCategory';
import { IDpProduct } from '../../../interface/IDpProduct';
import { IDpImage } from '../../../interface/IDpImage';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthProjService } from '../../../services/auth-proj.service';
import { CategoriesRepositoryService } from '../../../repositories/categories-repository.service';
import { ImagesRepositoryService } from '../../../repositories/images-repository.service';
import { ProductsRepositoryService } from '../../../repositories/products-repository.service';
import { ThemeToggleComponent } from '../../components/theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-user-page',
  imports: [
    CommonModule,
    DialogCategoryComponent,
    DialogImageComponent,
    DialogProductComponent,
    FormsModule,
    ReactiveFormsModule,
    TuiAutoFocus,
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
    TuiIcon,
    TuiAvatar,
    TuiIconPipe,
    ThemeToggleComponent
  ],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css', '../../../styles/root.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserPageComponent {
  private readonly dialogService = inject(TuiDialogService);
  private readonly authProjService = inject(AuthProjService);
  private readonly router = inject(Router);
  products: IDpProduct[] = [];
  categories: IDpCategory[] = [];
  images: IDpImage[] = [];

  editProductForm = new FormGroup({
    id: new FormControl<number | null>(null, Validators.required)
  });

  editCategoryForm = new FormGroup({
    id: new FormControl<number | null>(null, Validators.required)
  });

  editImageForm = new FormGroup({
    id: new FormControl<number | null>(null, Validators.required)
  });


  isProjAuthenticated: boolean = false;

  private readonly productDialog = tuiDialog(DialogProductComponent, {
    dismissible: true,
    label: 'Добавить запись о продукте',
  });

  private readonly categoryDialog = tuiDialog(DialogCategoryComponent, {
    dismissible: true,
    label: 'Добавить запись о категории',
  });

  private readonly imageDialog = tuiDialog(DialogImageComponent, {
    dismissible: true,
    label: 'Загрузить изображение продукта',
  });

  constructor(
    private productsRepository: ProductsRepositoryService,
    private categoriesRepository: CategoriesRepositoryService,
    private imagesRepository: ImagesRepositoryService
  ) { }


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
    localStorage.removeItem('projToken'); // Удаляем 'projToken'
    localStorage.removeItem('userProjId');
    this.authProjService.setAuthenticated(false);
    this.router.navigate(['/']);
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  openDialog(component: string): void {
    switch (component) {
      case 'product':
        this.productDialog({} as IDpProduct).subscribe({
          next: (data) => {
            console.log('Creating product with data:', JSON.stringify(data, null, 2));
            this.products.push(data); // Добавить в массив
          },
          complete: () => {
            console.info('Product dialog closed');
          }
        });
        break;
      case 'category':
        this.categoryDialog({} as IDpCategory).subscribe({
          next: (data) => {
            console.log('Creating category with data:', JSON.stringify(data, null, 2));
          },
          complete: () => {
            console.info('Category dialog closed');
          }
        });
        break;
      case 'image':
        this.imageDialog({} as IDpImage).subscribe({
          next: (data) => {
            console.log('Uploading image with data:', JSON.stringify(data, null, 2));
          },
          complete: () => {
            console.info('Image dialog closed');
          }
        });
        break;
    }
  }

  editProductById(id: number | null): void {
    if (id == null) return;
    this.productsRepository.getProductById(id).subscribe({
      next: (product) => {
        this.productDialog(product).subscribe({
          next: (data) => {
            console.log('Updated product:', data);
          },
          complete: () => {
            console.info('Product edit dialog closed');
          }
        });
      },
      error: () => {
        console.warn('Продукт с таким ID не найден');
      }
    });
  }

  editCategoryById(id: number | null): void {
    if (id == null) return;
    this.categoriesRepository.getDpCategoryById(id).subscribe({
      next: (category) => {
        this.categoryDialog(category).subscribe({
          next: (data) => {
            console.log('Updated category:', data);
          },
          complete: () => {
            console.info('Category edit dialog closed');
          }
        });
      },
      error: () => {
        console.warn('Категория с таким ID не найдена');
      }
    });
  }

  editImageById(id: number | null): void {
    if (id == null) return;
    this.imagesRepository.getDpImageById(id).subscribe({
      next: (image) => {
        this.imageDialog(image).subscribe({
          next: (data) => {
            console.log('Updated image:', data);
          },
          complete: () => {
            console.info('Image edit dialog closed');
          }
        });
      },
      error: () => {
        console.warn('Изображение с таким ID не найдено');
      }
    });
  }
}