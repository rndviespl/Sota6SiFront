import { CommonModule, AsyncPipe, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiFiles } from '@taiga-ui/kit';

@Component({
  selector: 'app-dialog-product',
  imports: [CommonModule,
    AsyncPipe, 
    NgIf, 
    ReactiveFormsModule, 
    TuiFiles,],
  templateUrl: './dialog-product.component.html',
  styleUrl: './dialog-product.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogProductComponent {
  @ViewChild('productNameInput') productNameInputRef!: ElementRef;
  @ViewChild('productDescriptionInput') productDescriptionInputRef!: ElementRef;

  productData = { name: '', description: '' };

  get productFormValid(): boolean {
    return this.productData.name.trim() !== '';
  }

  addProduct(): void {
    // Implement product addition logic here
  }
}