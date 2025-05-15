import { CommonModule, AsyncPipe, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiDataListWrapper, TuiFiles, TuiSlider } from '@taiga-ui/kit';
import { TuiAlertService, TuiButton, TuiTextfield } from '@taiga-ui/core';
import { IDpCategory } from '../../../interface/IDpCategory';
import { CategoriesRepositoryService } from '../../../repositories/categories-repository.service';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';

@Component({
  selector: 'app-dialog-category',
  imports: [
    CommonModule,
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    TuiFiles,
    TuiAutoFocus,
    TuiButton,
    TuiDataListWrapper,
    TuiInputModule,
    TuiSelectModule,
    TuiSlider,
    TuiTextfield,
    TuiTextfieldControllerModule,
  ],
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogCategoryComponent {
  @ViewChild('categoryNameInput') categoryNameInputRef!: ElementRef;

  categoryData = { name: '' };

  constructor(
    private readonly alerts: TuiAlertService,
    private categoriesRepositoryService: CategoriesRepositoryService
  ) { }

  get categoryFormValid(): boolean {
    return this.categoryData.name.trim() !== '';
  }

  addCategory(): void {
    if (this.categoryFormValid) {
      const newCategory: IDpCategory = {
        dpCategoryId: 0,
        dpCategoryTitle: this.categoryData.name,
        sizeId: 0,
        size: { sizeId: 0, size: '' },
        dpProducts: []
      };

      this.categoriesRepositoryService.createDpCategory(newCategory).subscribe({
        next: (createdCategory) => {
          this.alerts.open('Category added successfully!', {
            label: 'Success',
            appearance: 'success',
            autoClose: 5000,
          }).subscribe();
          this.categoryData.name = '';
        },
        error: (error) => {
          this.alerts.open('Failed to add category.', {
            label: 'Error',
            appearance: 'negative',
            autoClose: 5000,
          }).subscribe();
        }
      });
    }
  }

  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleanedValue = input.value.replace(/[^a-zA-Z0-9]/g, '');

    const maxLength = 200;
    const finalValue = this.checkLengthAndWarn(cleanedValue, maxLength);

    input.value = finalValue;
    this.categoryData.name = finalValue;
  }

  private checkLengthAndWarn(value: string, maxLength: number, warningThreshold: number = 15): string {
    if (value.length > maxLength) {
      this.showError(`You have exceeded the maximum length of ${maxLength} characters. No more characters can be added.`);
      return value.slice(0, maxLength);
    } else if (value.length > maxLength - warningThreshold) {
      this.showWarning(`You are approaching the character limit. ${maxLength - value.length} characters left.`);
    }
    return value;
  }

  protected moveFocus(targetInput: ElementRef): void {
    targetInput.nativeElement.querySelector('input').focus();
  }

  private showWarning(message: string): void {
    this.alerts.open(message, {
      label: 'Warning',
      appearance: 'warning',
      autoClose: 5000,
    }).subscribe();
  }

  private showError(message: string): void {
    this.alerts.open(message, {
      label: 'Error',
      appearance: 'negative',
      autoClose: 5000,
    }).subscribe();
  }
}
