import { Component, OnInit } from '@angular/core';
import { IAddToCartRequest } from '../../../interface/IAddToCartRequest';
import { ICartItem } from '../../../interface/ICartItem';
import { IDpProduct } from '../../../interface/IDpProduct';
import { ProductsRepositoryService } from '../../../repositories/products-repository.service';
import { ShopCartRepositoryService } from '../../../repositories/shop-cart-repository.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { ICartViewModel } from '../../../interface/ICartViewModel';

@Component({
  selector: 'app-page-cart',
  imports: [CommonModule, TuiAppearance, TuiButton, FormsModule],
  templateUrl: './page-cart.component.html',
  styleUrls: ['./page-cart.component.css',
    '../../../styles/root.css',],
})
export class PageCartComponent implements OnInit {
  cartItems: ICartItem[] = [];

  constructor(private cartService: ShopCartRepositoryService) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.cartService.getCart().subscribe((cartViewModel: ICartViewModel) => {
      this.cartItems = cartViewModel.cartItems;
    });
  }
}