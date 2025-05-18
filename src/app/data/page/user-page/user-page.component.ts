import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { DialogCategoryComponent } from "../../components/dialog-category/dialog-category.component";
import { DialogImageComponent } from "../../components/dialog-image/dialog-image.component";
import { DialogProductComponent } from "../../components/dialog-product/dialog-product.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiButton, TuiDialogService, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiFiles, TuiSlider } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { tuiDialog } from '@taiga-ui/core';
import { IDpCategory } from '../../../interface/IDpCategory';
import { IDpProduct } from '../../../interface/IDpProduct';
import { IDpImage } from '../../../interface/IDpImage';

@Component({
  selector: 'app-user-page',
  standalone: true, // If using standalone components
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
    TuiFiles
  ],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserPageComponent {
  private readonly dialogService = inject(TuiDialogService);

  private readonly productDialog = tuiDialog(DialogProductComponent, {
    dismissible: true,
    label: 'Создать продукт',
  });

  private readonly categoryDialog = tuiDialog(DialogCategoryComponent, {
    dismissible: true,
    label: 'Создать категорию',
  });

  private readonly imageDialog = tuiDialog(DialogImageComponent, {
    dismissible: true,
    label: 'Загрузить изображение',
  });

  openDialog(component: string): void {
    switch (component) {
      case 'product':
        this.productDialog({} as IDpProduct).subscribe({
          next: (data) => {
            console.log('Creating product with data:', JSON.stringify(data, null, 2));
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
}
