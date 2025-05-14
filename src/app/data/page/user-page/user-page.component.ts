import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogCategoryComponent } from "../../components/dialog-category/dialog-category.component";
import { DialogImageComponent } from "../../components/dialog-image/dialog-image.component";
import { DialogProductComponent } from "../../components/dialog-product/dialog-product.component";

@Component({
  selector: 'app-user-page',
  standalone: true, // If using standalone components
  imports: [CommonModule, DialogCategoryComponent, DialogImageComponent, DialogProductComponent],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UserPageComponent {
  activeComponent: string = '';

  showComponent(component: string): void {
    this.activeComponent = component;
  }
}
