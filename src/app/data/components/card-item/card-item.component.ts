import { Component, Input } from '@angular/core';
import { IDpProduct } from '../../../interface/IDpProduct';
import { CommonModule } from '@angular/common';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { IAddToCartRequest } from '../../../interface/IAddToCartRequest';
import { ProductsRepositoryService } from '../../../repositories/products-repository.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImagesRepositoryService } from '../../../repositories/images-repository.service';

@Component({
  selector: 'app-card-item',
  imports: [CommonModule, TuiAppearance, TuiButton],
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css']
})

export class CardItemComponent {
  @Input() productInfo!: IDpProduct;
  imageUrls: { [key: number]: SafeUrl } = {};

  constructor(
    private productsRepository: ProductsRepositoryService,
    private imagesRepository: ImagesRepositoryService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loadImageUrls();
  }

  private loadImageUrls(): void {
    if (this.productInfo.dpImages) {
      this.productInfo.dpImages.forEach(image => {
        this.imagesRepository.getDpImageData(image.dpImagesId).subscribe(blob => {
          const url = URL.createObjectURL(blob);
          this.imageUrls[image.dpImagesId] = this.sanitizer.bypassSecurityTrustUrl(url);
        });
      });
    }
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