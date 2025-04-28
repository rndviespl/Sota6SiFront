import { Component, OnInit } from '@angular/core';
import { IDpProduct } from '../../../interface/IDpProduct';
import { ProductsRepositoryService } from '../../../repositories/products-repository.service';
import { CardItemComponent } from '../../components/card-item/card-item.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-cart-item',
  imports: [CardItemComponent,CommonModule],
  templateUrl: './page-cart-item.component.html',
  styleUrl: './page-cart-item.component.css'
})
export class PageCartItemComponent implements OnInit {
  products: IDpProduct[] = [];

  constructor(private productsRepository: ProductsRepositoryService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.productsRepository.getAllProducts().subscribe({
      next: (productList: IDpProduct[]) => {
        this.products = productList;
      },
      error: (error) => {
        console.error('Ошибка при загрузке товаров:', error);
      }
    });
  }
}
