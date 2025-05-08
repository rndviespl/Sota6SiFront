import { AsyncPipe, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiAppearance, TuiNumberFormat } from '@taiga-ui/core';
import { TuiTable, TuiComparator } from '@taiga-ui/addon-table';
import { TuiDay, tuiDefaultSort } from '@taiga-ui/cdk';
import { ICartItem } from '../../../interface/ICartItem';
import { ICartViewModel } from '../../../interface/ICartViewModel';
import { ShopCartRepositoryService } from '../../../repositories/shop-cart-repository.service';
import { IUpdateCartRequest } from '../../../interface/IUpdateCartRequest';
import { ChangeDetectorRef } from '@angular/core';

interface CartItem extends ICartItem {
  readonly date: TuiDay;
}

@Component({
  selector: 'app-page-cart',
  standalone: true,
  imports: [
    AsyncPipe,
    CurrencyPipe,
    FormsModule,
    NgForOf,
    NgIf,
    TuiAppearance,
    TuiButton,
    TuiTable,
    TuiNumberFormat,
  ],
  templateUrl: './page-cart.component.html',
  styleUrls: ['./page-cart.component.css', '../../../styles/root.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCartComponent implements OnInit {
  protected readonly options = { updateOn: 'blur' } as const;
  protected cartItems: CartItem[] = [];
  protected readonly columns = ['productTitle', 'price', 'quantity', 'totalPrice', 'actions'] as const;

  protected readonly totalSorter: TuiComparator<CartItem> = (a, b) =>
    tuiDefaultSort(a.price * a.quantity, b.price * b.quantity);

  constructor(private cartService: ShopCartRepositoryService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.cartService.getCart().subscribe((cartViewModel: ICartViewModel) => {
      this.cartItems = cartViewModel.cartItems.map(item => ({
        ...item,
        date: TuiDay.currentLocal(),
      }));
    });
  }

  protected trackByIndex(index: number): number {
    return index;
  }

  protected getTotal({ price, quantity }: CartItem): number {
    return price * quantity;
  }

  protected getTotalAmount(): number {
    return this.cartItems.reduce((sum, item) => sum + this.getTotal(item), 0);
  }

  increaseQuantity(item: CartItem): void {
    const newQuantity = item.quantity + 1;
    this.updateCartItemQuantity(item, newQuantity);
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      this.updateCartItemQuantity(item, newQuantity);
    }
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart({ productId: item.productId, sizeId: item.sizeId }).subscribe(() => {
      // Filter out the removed item from the cartItems array
      this.cartItems = this.cartItems.filter(cartItem =>
        !(cartItem.productId === item.productId && cartItem.sizeId === item.sizeId)
      );
    });
  }
  
  private updateCartItemQuantity(item: CartItem, newQuantity: number): void {
    const request: IUpdateCartRequest = {
        productId: item.productId,
        quantity: newQuantity,
        sizeId: item.sizeId // This is now valid as sizeId is part of CartItem
    };

    // Update local state immediately
    this.cartItems = this.cartItems.map(cartItem =>
        cartItem.productId === item.productId ? { ...cartItem, quantity: newQuantity } : cartItem
    );

    // Call API to update the cart
    this.cartService.updateCart(request).subscribe(response => {
        if (!response.success) {
            alert(response.message);
            // Optionally, revert the quantity if the update fails
            this.cartItems = this.cartItems.map(cartItem =>
                cartItem.productId === item.productId ? { ...cartItem, quantity: item.quantity } : cartItem
            );
        }
    });
  }

  protected onValueChange<K extends keyof CartItem>(
    value: CartItem[K],
    key: K,
    current: CartItem,
  ): void {
    const updated = { ...current, [key]: value };
    this.cartItems = this.cartItems.map((item) => (item === current ? updated : item));
  }
}
