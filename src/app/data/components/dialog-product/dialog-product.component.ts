// src/app/components/dialog-product/dialog-product.component.ts
import { Component, inject, ViewChild, ElementRef, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiAlertService, TuiButton, TuiDialogContext, TuiDialogService, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiSlider } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { injectContext } from '@taiga-ui/polymorpheus';
import { IDpProduct } from '../../../interface/IDpProduct';
import { ProductsRepositoryService } from '../../../repositories/products-repository.service';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { ConfigService } from '../../../services/config.service';
import { UserAchievementsRepositoryService } from '../../../repositories/user-achievements-repository.service';

@Component({
  selector: 'app-dialog-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiAutoFocus,
    TuiButton,
    TuiDataListWrapper,
    TuiInputModule,
    TuiSelectModule,
    TuiSlider,
    TuiTextfield,
    TuiTextfieldControllerModule,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogProductComponent implements OnInit {
  @ViewChild('productNameInput', { read: ElementRef }) productNameInputRef!: ElementRef;

  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly productsRepositoryService = inject(ProductsRepositoryService);
  private readonly userAchievementsRepository = inject(UserAchievementsRepositoryService);
  private readonly configService = inject(ConfigService);

  public readonly context = injectContext<TuiDialogContext<IDpProduct, IDpProduct>>();

  protected readonly productForm = new FormGroup({
    dpTitle: new FormControl('', Validators.required),
    dpDescription: new FormControl(''),
    dpPrice: new FormControl(0, [Validators.required, Validators.min(0)]),
    dpPurchasePrice: new FormControl(0, [Validators.required, Validators.min(0)]),
    dpCategoryId: new FormControl(0),
    dpDiscountPercent: new FormControl(0, [Validators.min(0), Validators.max(100)])
  });

  protected get hasValue(): boolean {
    return this.productForm.valid;
  }

  protected get data(): IDpProduct {
    return this.context.data;
  }

  ngOnInit(): void {
    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    this.userAchievementsRepository
      .handleAchievement(userProjId, this.configService.achievementIds.openProductDialogSuccess, 'тест-кейс: диалог продукта открыт!')
      .subscribe();
    if (this.data) {
      this.productForm.patchValue(this.data);
    }
  }

  protected submit(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    if (this.hasValue) {
      const productData = this.productForm.value;
      const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);

      if (this.data.dpProductId) {
        this.updateProduct({ ...productData, dpProductId: this.data.dpProductId } as IDpProduct, userProjId);
      } else {
        this.createProduct(productData as IDpProduct, userProjId);
      }
    } else {
      this.showError('Форма заполнена некорректно.');
    }
  }

  private createProduct(productData: IDpProduct, userProjId: number): void {
    this.productsRepositoryService.createProduct(productData).subscribe({
      next: (createdProduct) => {
        this.context.completeWith(createdProduct);
        this.showSuccess('Продукт успешно создан.');
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.createProductSuccess, 'тест-кейс: продукт успешно создан!')
          .subscribe();
      },
      error: (error) => {
        console.error('Ошибка при создании продукта:', error);
        this.showError('Ошибка при создании продукта.');
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.createProductFailed, 'тест-кейс: ошибка создания продукта!')
          .subscribe();
      }
    });
  }

  private updateProduct(productData: IDpProduct, userProjId: number): void {
    this.productsRepositoryService.updateProduct(productData.dpProductId, productData).subscribe({
      next: () => {
        this.context.completeWith(productData);
        this.showSuccess('Продукт успешно обновлён.');
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.updateProductSuccess, 'тест-кейс: продукт успешно обновлён!')
          .subscribe();
      },
      error: (error) => {
        console.error('Ошибка при обновлении продукта:', error);
        this.showError('Ошибка при обновлении продукта.');
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.updateProductFailed, 'тест-кейс: ошибка обновления продукта!')
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

  protected onInput(event: Event, controlName: string, maxLength: number): void {
    const input = event.target as HTMLInputElement;
    const cleanedValue = input.value;
    const finalValue = this.checkLengthAndWarn(cleanedValue, maxLength, controlName);
    input.value = finalValue;
    this.productForm.patchValue({ [controlName]: finalValue });
  }

  private checkLengthAndWarn(value: string, maxLength: number, controlName: string, warningThreshold: number = 15): string {
    if (value.length > maxLength) {
      this.showError(`Вы превысили максимальную длину в ${maxLength} символов для ${controlName}.`);
      return value.slice(0, maxLength);
    } else if (value.length > maxLength - warningThreshold) {
      this.showWarning(`Вы приближаетесь к лимиту символов для ${controlName}. Осталось ${maxLength - value.length} символов.`);
    }
    return value;
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