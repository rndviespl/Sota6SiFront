import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IDpProduct } from '../../../interface/IDpProduct';
import { ProductsRepositoryService } from '../../../repositories/products-repository.service';
import { CarouselImgComponent } from '../../components/carousel-img/carousel-img.component';
import { CommonModule } from '@angular/common';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { SecurityContext } from '@angular/core';
import { IDpImage } from '../../../interface/IDpImage';
import { FormsModule } from '@angular/forms';
import { ShopCartRepositoryService } from '../../../repositories/shop-cart-repository.service';

@Component({
  selector: 'app-page-item-from-catalog',
  imports: [CarouselImgComponent, CommonModule, TuiAppearance, TuiButton, FormsModule],
  templateUrl: './page-item-from-catalog.component.html',
  styleUrls: ['../../../styles/root.css', './page-item-from-catalog.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PageItemFromCatalogComponent implements OnInit {
  productInfo: IDpProduct = {} as IDpProduct;
  quantity: number = 1;
  selectedSizeId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private productsRepositoryService: ProductsRepositoryService,
    private cartService: ShopCartRepositoryService,
    private sanitizer: DomSanitizer
  ) {}

  get images(): IDpImage[] {
    return this.productInfo?.dpImages || [];
  }

  ngOnInit(): void {
    this.loadProductInfo();
  }

  private loadProductInfo(): void {
    const dpProductId = this.route.snapshot.paramMap.get('dpProductId');
    if (dpProductId) {
      this.productsRepositoryService.getProductById(+dpProductId).subscribe({
        next: (product: IDpProduct) => {
          this.productInfo = product;
        },
        error: (error) => {
          console.error('Ошибка при загрузке информации о продукте:', error);
        }
      });
    }
  }

  addToCart(): void {
    if (this.productInfo) {
      const request = {
        productId: this.productInfo.dpProductId,
        quantity: this.quantity,
        sizeId: this.selectedSizeId // This can be undefined
      };
      this.cartService.addToCart(request).subscribe(response => {
        alert(response.message);
      });
    } else {
      alert('Произошла ошибка при добавлении товара в корзину');
    }
  }

  openImageInFullscreen(imageUrl: SafeUrl): void {
    const url = this.sanitizer.sanitize(SecurityContext.URL, imageUrl);
    if (url) {
      const fullscreenDiv = document.createElement('div');
      fullscreenDiv.style.position = 'fixed';
      fullscreenDiv.style.top = '0';
      fullscreenDiv.style.left = '0';
      fullscreenDiv.style.width = '100%';
      fullscreenDiv.style.height = '100%';
      fullscreenDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      fullscreenDiv.style.display = 'flex';
      fullscreenDiv.style.justifyContent = 'center';
      fullscreenDiv.style.alignItems = 'center';
      fullscreenDiv.style.zIndex = '1000';

      const img = document.createElement('img');
      img.src = url;
      img.style.maxWidth = '90%';
      img.style.maxHeight = '90%';

      fullscreenDiv.appendChild(img);
      fullscreenDiv.addEventListener('click', () => {
        document.body.removeChild(fullscreenDiv);
      });

      document.body.appendChild(fullscreenDiv);
    }
  }

  onImageClick(imageUrl: SafeUrl): void {
    this.openImageInFullscreen(imageUrl);
  }
}