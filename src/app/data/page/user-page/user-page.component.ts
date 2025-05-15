import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogCategoryComponent } from "../../components/dialog-category/dialog-category.component";
import { DialogImageComponent } from "../../components/dialog-image/dialog-image.component";
import { DialogProductComponent } from "../../components/dialog-product/dialog-product.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

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
    MatDialogModule,
  ],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class UserPageComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(component: string): void {
    switch (component) {
      case 'product':
        this.dialog.open(DialogProductComponent);
        break;
      case 'category':
        this.dialog.open(DialogCategoryComponent);
        break;
      case 'image':
        this.dialog.open(DialogImageComponent);
        break;
    }
  }
}