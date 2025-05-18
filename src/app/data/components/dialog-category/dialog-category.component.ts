import { Component, inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiAlertService, TuiButton, TuiDialogContext, TuiDialogService, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiSlider } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { injectContext } from '@taiga-ui/polymorpheus';
import { IDpCategory } from "../../../interface/IDpCategory";
import { CategoriesRepositoryService } from '../../../repositories/categories-repository.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dialog-category',
  imports: [
    ReactiveFormsModule,
    TuiAutoFocus,
    TuiButton,
    TuiDataListWrapper,
    TuiInputModule,
    TuiSelectModule,
    TuiSlider,
    TuiTextfield,
    TuiTextfieldControllerModule,
    CommonModule
  ],
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.css'],
})
export class DialogCategoryComponent implements OnInit {
  @ViewChild('categoryNameInput', { read: ElementRef }) categoryNameInputRef!: ElementRef;

  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly categoriesRepositoryService = inject(CategoriesRepositoryService);

  public readonly context = injectContext<TuiDialogContext<IDpCategory, IDpCategory>>();

  protected readonly categoryForm = new FormGroup({
    dpCategoryTitle: new FormControl('', Validators.required),
    sizeId: new FormControl<number | null>(null),
  });

  protected get hasValue(): boolean {
    return this.categoryForm.valid;
  }

  protected get data(): IDpCategory {
    return this.context.data;
  }

  ngOnInit(): void {
    if (this.data) {
      this.categoryForm.patchValue(this.data);
    }
  }

  protected submit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (this.hasValue) {
      const categoryData = this.categoryForm.value;

      // If updating, include the dpCategoryId
      if (this.data.dpCategoryId) {
        this.updateCategory({ ...categoryData, dpCategoryId: this.data.dpCategoryId } as IDpCategory);
      } else {
        // If creating, exclude the dpCategoryId
        this.createCategory(categoryData as IDpCategory);
      }
    } else {
      console.error('Form is invalid.');
    }
  }

  private createCategory(categoryData: IDpCategory): void {
    this.categoriesRepositoryService.createDpCategory(categoryData).subscribe({
      next: (createdCategory) => {
        this.context.completeWith(createdCategory);
        this.showSuccess('Категория успешно создана.');
      },
      error: () => {
        this.showError('Ошибка при создании категории.');
      },
    });
  }

  private updateCategory(categoryData: IDpCategory): void {
    this.categoriesRepositoryService.updateDpCategory(categoryData.dpCategoryId, categoryData).subscribe({
      next: () => {
        this.context.completeWith(this.data);
        this.showSuccess('Категория успешно обновлена.');
      },
      error: () => {
        this.showError('Ошибка при обновлении категории.');
      },
    });
  }

  private showError(message: string): void {
    this.alerts
      .open(message, {
        label: 'Ошибка',
        appearance: 'negative',
        autoClose: 5000,
      })
      .subscribe();
  }

  private showSuccess(message: string): void {
    this.alerts
      .open(message, {
        label: 'Успех',
        appearance: 'success',
        autoClose: 5000,
      })
      .subscribe();
  }

  protected onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cleanedValue = input.value.replace(/[^a-zA-Z0-9]/g, '');

    const maxLength = 200;
    const finalValue = this.checkLengthAndWarn(cleanedValue, maxLength);

    input.value = finalValue;
    this.categoryForm.get('dpCategoryTitle')?.setValue(finalValue);
  }

  private checkLengthAndWarn(value: string, maxLength: number, warningThreshold: number = 15): string {
    if (value.length > maxLength) {
      this.showError(`Вы превысили максимальную длину в ${maxLength} символов. Больше символов добавить нельзя.`);
      return value.slice(0, maxLength);
    } else if (value.length > maxLength - warningThreshold) {
      this.showWarning(`Вы приближаетесь к лимиту символов. Осталось ${maxLength - value.length} символов.`);
    }
    return value;
  }

  protected moveFocus(targetInput: ElementRef): void {
    targetInput.nativeElement.querySelector('input').focus();
  }

  private showWarning(message: string): void {
    this.alerts.open(message, {
      label: 'Предупреждение',
      appearance: 'warning',
      autoClose: 5000,
    }).subscribe();
  }
}
