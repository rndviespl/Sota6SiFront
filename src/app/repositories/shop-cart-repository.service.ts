import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of } from 'rxjs';
import { IAddToCartRequest } from '../interface/IAddToCartRequest';
import { ICartViewModel } from '../interface/ICartViewModel';
import { IRemoveFromCartRequest } from '../interface/IRemoveFromCartRequest';
import { IUpdateCartRequest } from '../interface/IUpdateCartRequest';
import { IDpProduct } from '../interface/IDpProduct';
import { ProductsRepositoryService } from './products-repository.service';
import { ShopCartService } from '../services/dp-shop-cart.service';

@Injectable({
  providedIn: 'root'
})
export class ShopCartRepositoryService {
  private cartKey = 'shopping_cart';

  constructor(
    private productsRepositoryService: ProductsRepositoryService,
    private shopCartService: ShopCartService
  ) { }

  getCart(): Observable<ICartViewModel> {
    try {
      const cartItems = JSON.parse(localStorage.getItem(this.cartKey) || '[]');
      console.log('cartItems from localStorage:', cartItems);
      if (cartItems.length === 0) {
        return of({ cartItems: [], products: [] });
      }

      const productObservables = cartItems.map((item: IAddToCartRequest) =>
        this.productsRepositoryService.getProductById(item.productId)
      );

      return forkJoin(productObservables as Observable<IDpProduct>[]).pipe(
        map((products: IDpProduct[]) => {
          const cartItemsWithDetails = cartItems.map((item: IAddToCartRequest, index: number) => ({
            productId: item.productId,
            productTitle: products[index].dpTitle,
            price: products[index].dpPrice,
            quantity: item.quantity,
          }));

          return {
            cartItems: cartItemsWithDetails,
            products: products,
          };
        })
      );
    } catch (error) {
      console.error('Error retrieving cart items:', error);
      return of({ cartItems: [], products: [] });
    }
  }

  updateCart(request: IUpdateCartRequest): Observable<{ success: boolean; message: string }> {
    let cart = JSON.parse(localStorage.getItem(this.cartKey) || '[]');
    const itemIndex = cart.findIndex((item: IAddToCartRequest) =>
      item.productId === request.productId && item.sizeId === request.sizeId
    );

    if (itemIndex !== -1) {
      cart[itemIndex].quantity = request.quantity;
      localStorage.setItem(this.cartKey, JSON.stringify(cart));
      return of({ success: true, message: 'Корзина обновлена' });
    } else {
      return of({ success: false, message: 'Товар не найден в корзине' });
    }
  }

  addToCart(request: IAddToCartRequest): Observable<{ success: boolean; message: string }> {
    let cart = JSON.parse(localStorage.getItem(this.cartKey) || '[]');
    const existingItem = cart.find((item: IAddToCartRequest) =>
      item.productId === request.productId && item.sizeId === request.sizeId
    );

    if (existingItem) {
      existingItem.quantity += request.quantity;
    } else {
      cart.push(request);
    }

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    return of({ success: true, message: 'Товар добавлен в корзину' });
  }

  getCartQuantity(productId: number, sizeId?: number): Observable<{ currentQuantity: number }> {
    const cart = JSON.parse(localStorage.getItem(this.cartKey) || '[]');
    const item = cart.find((item: IAddToCartRequest) =>
      item.productId === productId && item.sizeId === sizeId
    );

    const currentQuantity = item ? item.quantity : 0;
    return of({ currentQuantity });
  }

  checkout(): Observable<{ orderId: number; orderDetails: any[] }> {
    const cart = JSON.parse(localStorage.getItem(this.cartKey) || '[]');

    if (cart.length === 0) {
      return of({ orderId: 0, orderDetails: [] });
    }

    // Убедитесь, что данные корректны перед отправкой
    const cartData = cart.map((item: IAddToCartRequest) => ({
      productId: item.productId,
      quantity: item.quantity,
      sizeId: item.sizeId || null // Убедитесь, что sizeId может быть null
    }));

    // Отправьте данные на бэкенд
    return this.shopCartService.checkout(cartData);
  }

  removeFromCart(request: IRemoveFromCartRequest): Observable<void> {
    let cart = JSON.parse(localStorage.getItem(this.cartKey) || '[]');
    cart = cart.filter((item: IAddToCartRequest) =>
      !(item.productId === request.productId && item.sizeId === request.sizeId)
    );

    localStorage.setItem(this.cartKey, JSON.stringify(cart));
    return of(undefined);
  }

  exportToExcel(orderId: number): Observable<Blob> {
    return this.shopCartService.exportToExcel(orderId);
  }

  clearCart(): void {
    localStorage.removeItem(this.cartKey);
  }
}
