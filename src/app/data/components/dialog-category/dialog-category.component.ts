// src/app/components/dialog-category/dialog-category.component.ts
import { Component, inject, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiAlertService, TuiButton, TuiDialogContext, TuiDialogService, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiSlider } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { injectContext } from '@taiga-ui/polymorpheus';
import { IDpCategory } from '../../../interface/IDpCategory';
import { CategoriesRepositoryService } from '../../../repositories/categories-repository.service';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../../services/config.service';
import { UserAchievementsRepositoryService } from '../../../repositories/user-achievements-repository.service';

@Component({
  selector: 'app-dialog-category',
  standalone: true,
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
  styleUrls: ['./dialog-category.component.css']
})
export class DialogCategoryComponent implements OnInit {
  @ViewChild('categoryNameInput', { read: ElementRef }) categoryNameInputRef!: ElementRef;

  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly categoriesRepositoryService = inject(CategoriesRepositoryService);
  private readonly userAchievementsRepository = inject(UserAchievementsRepositoryService);
  private readonly configService = inject(ConfigService);

  public readonly context = injectContext<TuiDialogContext<IDpCategory, IDpCategory>>();

  protected readonly categoryForm = new FormGroup({
    dpCategoryTitle: new FormControl('', Validators.required),
    sizeId: new FormControl<number | null>(null)
  });

  protected get hasValue(): boolean {
    return this.categoryForm.valid;
  }

  protected get data(): IDpCategory {
    return this.context.data;
  }

  ngOnInit(): void {
    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    this.userAchievementsRepository
      .handleAchievement(
        userProjId,
        this.configService.achievementIds.openCategoryDialogSuccess,
        'Достижение: диалог категории открыт!'
      )
      .subscribe();
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
      const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);

      if (this.data.dpCategoryId) {
        this.updateCategory({ ...categoryData, dpCategoryId: this.data.dpCategoryId } as IDpCategory, userProjId);
      } else {
        this.createCategory(categoryData as IDpCategory, userProjId);
      }
    } else {
      this.showError('Форма заполнена некорректно.');
    }
  }

  private createCategory(categoryData: IDpCategory, userProjId: number): void {
    this.categoriesRepositoryService.createDpCategory(categoryData).subscribe({
      next: (createdCategory) => {
        this.context.completeWith(createdCategory);
        this.showSuccess('Категория успешно создана.');
        this.userAchievementsRepository
          .handleAchievement(
            userProjId,
            this.configService.achievementIds.addCategorySuccess,
            'Достижение: категория успешно создана!'
          )
          .subscribe();
      },
      error: (error) => {
        console.error('Ошибка при создании категории:', error);
        this.showError('Ошибка при создании категории.');
        this.userAchievementsRepository
          .handleAchievement(
            userProjId,
            this.configService.achievementIds.addCategoryFailed, // Исправляем
            'Достижения: ошибка создания категории!'
          )
          .subscribe();
      }
    });
  }

  private updateCategory(categoryData: IDpCategory, userProjId: number): void {
    this.categoriesRepositoryService.updateDpCategory(categoryData.dpCategoryId, categoryData).subscribe({
      next: () => {
        this.context.completeWith(categoryData);
        this.showSuccess('Категория успешно обновлена.');
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.updateCategorySuccess, 'Достижение: категория успешно обновлена!')
          .subscribe();
      },
      error: (error) => {
        console.error('Ошибка при обновлении категории:', error);
        this.showError('Ошибка при обновлении категории.');
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.updateCategoryFailed, 'Достижение: ошибка обновления категории!')
          .subscribe();
      }
    });
  }

  private showError(message: string): void {
    this.alerts
      .open(message, {
        label: 'Ошибка',
        appearance: 'negative',
        autoClose: 5000
      })
      .subscribe();
  }

  private showSuccess(message: string): void {
    this.alerts
      .open(message, {
        label: 'Успех',
        appearance: 'success',
        autoClose: 5000
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
      this.showError(`Вы превысили максимальную длину в ${maxLength} символов.`);
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
    this.alerts
      .open(message, {
        label: 'Предупреждение',
        appearance: 'warning',
        autoClose: 5000
      })
      .subscribe();
  }
}