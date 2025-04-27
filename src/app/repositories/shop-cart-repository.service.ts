import { Injectable } from '@angular/core';
import { ShopCartService } from '../services/dp-shop-cart.service';
import { Observable } from 'rxjs';
import { IAddToCartRequest } from '../interface/IAddToCartRequest';
import { ICartViewModel } from '../interface/ICartViewModel';
import { IDpOrderDetail } from '../interface/IDpOrderDetail';
import { IRemoveFromCartRequest } from '../interface/IRemoveFromCartRequest';
import { IUpdateCartRequest } from '../interface/IUpdateCartRequest';

@Injectable({
  providedIn: 'root'
})
export class ShopCartRepositoryService {

  constructor(private shopCartService: ShopCartService) {}

  getCart(): Observable<ICartViewModel> {
    return this.shopCartService.getCart();
  }

  updateCart(request: IUpdateCartRequest): Observable<{ success: boolean; message: string }> {
    return this.shopCartService.updateCart(request);
  }

  addToCart(request: IAddToCartRequest): Observable<{ success: boolean; message: string }> {
    return this.shopCartService.addToCart(request);
  }

  getCartQuantity(productId: number, sizeId: number): Observable<{ currentQuantity: number }> {
    return this.shopCartService.getCartQuantity(productId, sizeId);
  }

  checkout(): Observable<{ orderId: number; orderDetails: IDpOrderDetail[] }> {
    return this.shopCartService.checkout();
  }

  removeFromCart(request: IRemoveFromCartRequest): Observable<void> {
    return this.shopCartService.removeFromCart(request);
  }

  exportToExcel(orderId: number): Observable<Blob> {
    return this.shopCartService.exportToExcel(orderId);
  }
}

