import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { IDpProduct } from '../../../interface/IDpProduct';
import { CommonModule } from '@angular/common';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { IAddToCartRequest } from '../../../interface/IAddToCartRequest';
import { ProductsRepositoryService } from '../../../repositories/products-repository.service';
import { CarouselImgComponent } from '../carousel-img/carousel-img.component';
import { IDpImage } from '../../../interface/IDpImage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-item',
  imports: [
    CommonModule,
    TuiAppearance,
    TuiButton,
    CarouselImgComponent
  ],
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css',
    '../../../styles/root.css',],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardItemComponent {
  @Input() productInfo!: IDpProduct;

  constructor(private router: Router) {}

  get images(): IDpImage[] {
    return this.productInfo.dpImages || [];
  }

  navigateToProduct(product: IDpProduct): void {
    this.router.navigate(['/product', product.dpProductId]);
  }
}