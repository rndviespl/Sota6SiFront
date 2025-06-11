import { AsyncPipe, CommonModule, CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TuiButton, TuiAppearance, TuiAlertService, TuiScrollbar, TuiIcon } from '@taiga-ui/core';
import { TuiTable, TuiComparator } from '@taiga-ui/addon-table';
import { TuiDay, tuiDefaultSort } from '@taiga-ui/cdk';
import { ICartItem } from '../../../interface/ICartItem';
import { ICartViewModel } from '../../../interface/ICartViewModel';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { IUpdateCartRequest } from '../../../interface/IUpdateCartRequest';
import { ShopCartRepositoryService } from '../../../repositories/shop-cart-repository.service';
import { UserAchievementsRepositoryService } from '../../../repositories/user-achievements-repository.service';
import { ConfigService } from '../../../services/config.service';

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
    TuiButton,
    TuiTable,
    CommonModule,
    TuiScrollbar,
    TuiIcon
  ],
  templateUrl: './page-cart.component.html',
  styleUrls: ['./page-cart.component.css', '../../../styles/root.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageCartComponent implements OnInit {
  protected readonly options = { updateOn: 'blur' } as const;
  protected cartItems: CartItem[] = [];
  protected readonly columns = ['productTitle', 'price', 'quantity', 'totalPrice', 'actions'] as const;
  protected isLoading = false;
  private readonly siteUserId = 1;

  protected readonly totalSorter: TuiComparator<CartItem> = (a, b) =>
    tuiDefaultSort(a.price * a.quantity, b.price * b.quantity);

  constructor(
    private cartService: ShopCartRepositoryService,
    private cdr: ChangeDetectorRef,
    public router: Router,
    private userAchievementsRepository: UserAchievementsRepositoryService,
    private configService: ConfigService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  private loadCartItems(): void {
    this.isLoading = true;
    this.cartService.getCart().subscribe({
      next: (cartViewModel: ICartViewModel) => {
        this.cartItems = cartViewModel.cartItems.map(item => ({
          ...item,
          date: TuiDay.currentLocal(),
        }));
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Ошибка при загрузке корзины:', error);
        this.alertService.open('Не удалось загрузить корзину. Попробуйте ещё раз!', { appearance: 'error' }).subscribe();
        this.isLoading = false;
        this.cdr.markForCheck();
      }
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
    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    this.isLoading = true;
    this.cartService.removeFromCart({ productId: item.productId, sizeId: item.sizeId }).subscribe({
      next: () => {
        this.cartItems = this.cartItems.filter(cartItem =>
          !(cartItem.productId === item.productId && cartItem.sizeId === item.sizeId)
        );
        this.isLoading = false;
        this.cdr.markForCheck();
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.removeFromCartSuccess, 'Товар успешно удалён из корзины!')
          .subscribe();
        this.alertService.open('Товар удалён из корзины', { appearance: 'success' }).subscribe();
      },
      error: (error) => {
        console.error('Ошибка при удалении товара из корзины:', error);
        this.isLoading = false;
        this.cdr.markForCheck();
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.removeFromCartFailed, 'Ошибка удаления товара из корзины!')
          .subscribe();
        this.alertService.open('Не удалось удалить товар. Попробуйте ещё раз!', { appearance: 'error' }).subscribe();
      }
    });
  }

  checkout(): void {
    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    if (this.cartItems.length === 0) {
      this.userAchievementsRepository
        .handleAchievement(userProjId, this.configService.achievementIds.checkoutEmptyCart, 'Попытка оформления пустой корзины!')
        .subscribe();
      this.alertService.open('Корзина пуста, добавьте товары перед оформлением', { appearance: 'error' }).subscribe();
      return;
    }

    this.isLoading = true;
    this.cartService.checkout().subscribe({
      next: (response) => {
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.checkoutSuccess, 'Заказ успешно оформлен!')
          .subscribe();
        this.alertService.open('Заказ успешно оформлен!', { appearance: 'success' }).subscribe();
        this.cartService.clearCart();
        this.cartItems = [];
        this.isLoading = false;
        this.cdr.markForCheck();
        this.router.navigate(['/order-confirmation'], { state: { orderId: response.orderId } });
      },
      error: (error) => {
        console.error('Ошибка при оформлении заказа:', error);
        this.isLoading = false;
        this.cdr.markForCheck();
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.checkoutFailed, 'Ошибка оформления заказа!')
          .subscribe();
        this.alertService.open('Не удалось оформить заказ. Попробуйте ещё раз!', { appearance: 'error' }).subscribe();
      }
    });
  }

  private updateCartItemQuantity(item: CartItem, newQuantity: number): void {
    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    this.isLoading = true;
    const request: IUpdateCartRequest = {
      productId: item.productId,
      quantity: newQuantity,
      sizeId: item.sizeId
    };

    this.cartItems = this.cartItems.map(cartItem =>
      cartItem.productId === item.productId && cartItem.sizeId === item.sizeId
        ? { ...cartItem, quantity: newQuantity }
        : cartItem
    );
    this.cdr.markForCheck();

    this.cartService.updateCart(request).subscribe({
      next: (response) => {
        if (response.success) {
          this.userAchievementsRepository
            .handleAchievement(userProjId, this.configService.achievementIds.updateCartQuantitySuccess, 'Количество товара успешно обновлено!')
            .subscribe();
          this.alertService.open('Количество товара успешно обновлено', { appearance: 'success' }).subscribe();
        } else {
          this.cartItems = this.cartItems.map(cartItem =>
            cartItem.productId === item.productId && cartItem.sizeId === item.sizeId
              ? { ...cartItem, quantity: item.quantity }
              : cartItem
          );
          this.cdr.markForCheck();
          this.userAchievementsRepository
            .handleAchievement(userProjId, this.configService.achievementIds.updateCartQuantityFailed, 'Ошибка обновления количества товара!')
            .subscribe();
          this.alertService.open('Не удалось обновить количество. Попробуйте ещё раз!', { appearance: 'error' }).subscribe();
        }
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        this.cartItems = this.cartItems.map(cartItem =>
          cartItem.productId === item.productId && cartItem.sizeId === item.sizeId
            ? { ...cartItem, quantity: item.quantity }
            : cartItem
        );
        this.cdr.markForCheck();
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.updateCartQuantityFailed, 'Ошибка обновления количества товара!')
          .subscribe();
        this.alertService.open('Ошибка при обновлении количества. Попробуйте ещё раз!', { appearance: 'error' }).subscribe();
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  protected onValueChange<K extends keyof CartItem>(
    value: CartItem[K],
    key: K,
    current: CartItem
  ): void {
    const updated = { ...current, [key]: value };
    this.cartItems = this.cartItems.map((item) => (item === current ? updated : item));
    this.cdr.markForCheck();
  }

  protected onSortChange(event: any): void {
    // Логика сортировки, если нужна
  }
}
