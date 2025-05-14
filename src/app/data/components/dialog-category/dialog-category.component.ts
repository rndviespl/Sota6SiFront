import { CommonModule, AsyncPipe, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiFiles } from '@taiga-ui/kit';

@Component({
  selector: 'app-dialog-category',
  imports: [CommonModule,
    AsyncPipe, 
    NgIf, 
    ReactiveFormsModule, 
    TuiFiles,],
  templateUrl: './dialog-category.component.html',
  styleUrl: './dialog-category.component.css',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class DialogCategoryComponent {
  @ViewChild('categoryNameInput') categoryNameInputRef!: ElementRef;

  categoryData = { name: '' };

  get categoryFormValid(): boolean {
    return this.categoryData.name.trim() !== '';
  }

  addCategory(): void {
    // Implement category addition logic here
  }
}