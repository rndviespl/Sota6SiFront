import { Component, inject, ViewChild, ElementRef, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiAlertService, TuiButton, TuiDialogContext, TuiDialogService, TuiTextfield } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiFiles, TuiSlider } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';
import { injectContext } from '@taiga-ui/polymorpheus';
import { IDpProduct } from "../../../interface/IDpProduct";
import { ProductsRepositoryService } from '../../../repositories/products-repository.service';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-dialog-product',
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
   
  ],
  templateUrl: './dialog-product.component.html',
  styleUrls: ['./dialog-product.component.css'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogProductComponent implements OnInit {
  @ViewChild('productNameInput', { read: ElementRef }) productNameInputRef!: ElementRef;

  private readonly alerts = inject(TuiAlertService);
  private readonly dialogs = inject(TuiDialogService);
  private readonly productsRepositoryService = inject(ProductsRepositoryService);

  public readonly context = injectContext<TuiDialogContext<IDpProduct, IDpProduct>>();

  protected readonly productForm = new FormGroup({
    dpTitle: new FormControl('', Validators.required),
    dpDescription: new FormControl(''),
    dpPrice: new FormControl(0, Validators.required),
    dpPurchasePrice: new FormControl(0, Validators.required),
    dpCategoryId: new FormControl(0),
    dpDiscountPercent: new FormControl(0),
  });

  protected get hasValue(): boolean {
    return this.productForm.valid;
  }

  protected get data(): IDpProduct {
    return this.context.data;
  }

  ngOnInit(): void {
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

      // If updating, include the dpProductId
      if (this.data.dpProductId) {
        this.updateProduct({ ...productData, dpProductId: this.data.dpProductId } as IDpProduct);
      } else {
        // If creating, exclude the dpProductId
        this.createProduct(productData as IDpProduct);
      }
    } else {
      console.error('Form is invalid.');
    }
  }

  private createProduct(productData: IDpProduct): void {
    this.productsRepositoryService.createProduct(productData).subscribe({
      next: (createdProduct) => {
        this.context.completeWith(createdProduct);
        this.showSuccess('Продукт успешно создан.');
      },
      error: () => {
        this.showError('Ошибка при создании продукта.');
      },
    });
  }

  private updateProduct(productData: IDpProduct): void {
    this.productsRepositoryService.updateProduct(productData.dpProductId, productData).subscribe({
      next: () => {
        this.context.completeWith(this.data);
        this.showSuccess('Продукт успешно обновлен.');
      },
      error: () => {
        this.showError('Ошибка при обновлении продукта.');
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
    this.alerts.open(message, {
      label: 'Предупреждение',
      appearance: 'warning',
      autoClose: 5000,
    }).subscribe();
  }
}
