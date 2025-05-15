import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { TuiAlertService, TuiButton, TuiTextfield } from '@taiga-ui/core';
import { IDpProduct } from '../../../interface/IDpProduct';
import { ProductsRepositoryService } from '../../../repositories/products-repository.service';
import { CommonModule } from '@angular/common';
import { TuiAutoFocus } from '@taiga-ui/cdk';
import { TuiDataListWrapper, TuiSlider } from '@taiga-ui/kit';
import { TuiInputModule, TuiSelectModule, TuiTextfieldControllerModule } from '@taiga-ui/legacy';

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogProductComponent {
    protected readonly productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      price: new FormControl(0, Validators.required),
      purchasePrice: new FormControl(0, Validators.required),
      categoryId: new FormControl(0),
      discountPercent: new FormControl(0),
    });
  
    constructor(
      private readonly alerts: TuiAlertService,
      private productsRepositoryService: ProductsRepositoryService
    ) {}
  
    get productFormValid(): boolean {
      return this.productForm.valid;
    }
  
    addProduct(): void {
      if (this.productForm.valid) {
        const newProduct: IDpProduct = this.createProductFromForm();
        this.submitProduct(newProduct);
      }
    }
  
    private createProductFromForm(): IDpProduct {
      return {
        dpProductId: 0,
        dpTitle: this.productForm.value.name!,
        dpDescription: this.productForm.value.description || undefined,
        dpPrice: this.productForm.value.price!,
        dpPurchasePrice: this.productForm.value.purchasePrice!,
        dpCategoryId: this.productForm.value.categoryId || undefined,
        dpDiscountPercent: this.productForm.value.discountPercent || undefined,
        dpImages: [],
        dpProductAttributes: []
      };
    }
    
  
    private submitProduct(newProduct: IDpProduct): void {
      this.productsRepositoryService.createProduct(newProduct).subscribe({
        next: () => this.handleSuccess(),
        error: () => this.handleError()
      });
    }
  
    private handleSuccess(): void {
      this.alerts.open('Product added successfully!', {
        label: 'Success',
        appearance: 'success',
        autoClose: 5000,
      }).subscribe();
      this.productForm.reset();
    }
  
    private handleError(): void {
      this.alerts.open('Failed to add product.', {
        label: 'Error',
        appearance: 'negative',
        autoClose: 5000,
      }).subscribe();
    }
  
    protected onInput(event: Event, controlName: string, maxLength: number): void {
      const input = event.target as HTMLInputElement;
      const cleanedValue = input.value.replace(/[^a-zA-Z0-9]/g, '');
      const finalValue = this.checkLengthAndWarn(cleanedValue, maxLength, controlName);
      input.value = finalValue;
      this.productForm.patchValue({ [controlName]: finalValue });
    }
  
    private checkLengthAndWarn(value: string, maxLength: number, controlName: string, warningThreshold: number = 15): string {
      if (value.length > maxLength) {
        this.showError(`You have exceeded the maximum length of ${maxLength} characters for ${controlName}.`);
        return value.slice(0, maxLength);
      } else if (value.length > maxLength - warningThreshold) {
        this.showWarning(`You are approaching the character limit for ${controlName}. ${maxLength - value.length} characters left.`);
      }
      return value;
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