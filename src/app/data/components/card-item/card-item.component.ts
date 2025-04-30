import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { IDpProduct } from '../../../interface/IDpProduct';
import { CommonModule } from '@angular/common';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { IAddToCartRequest } from '../../../interface/IAddToCartRequest';
import { ProductsRepositoryService } from '../../../repositories/products-repository.service';
import { CarouselImgComponent } from '../carousel-img/carousel-img.component';
import { IDpImage } from '../../../interface/IDpImage';

@Component({
  selector: 'app-card-item',
  imports: [
    CommonModule,
    TuiAppearance,
    TuiButton,
    CarouselImgComponent
  ],
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardItemComponent {
  @Input() productInfo!: IDpProduct;

  constructor(private productsRepository: ProductsRepositoryService) {}

  get images(): IDpImage[] {
    return this.productInfo.dpImages || [];
  }

  addToCart(product: IDpProduct): void {
    const sizeId = product.dpProductAttributes?.[0]?.dpSize;
    if (sizeId === undefined) {
      console.error('Размер товара не определен.');
      return;
    }

    const request: IAddToCartRequest = {
      productId: product.dpProductId,
      quantity: 1,
      sizeId: sizeId
    };

    this.productsRepository.addToCart(request).subscribe({
      next: (response) => {
        if (response.success) {
          console.log('Товар добавлен в корзину:', response.message);
        } else {
          console.error('Ошибка при добавлении в корзину:', response.message);
        }
      },
      error: (error) => {
        console.error('Ошибка при добавлении в корзину:', error);
      }
    });
  }
}
