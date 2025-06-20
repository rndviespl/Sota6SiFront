import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IDpProduct } from '../../../interface/IDpProduct';
import { ProductsRepositoryService } from '../../../repositories/products-repository.service';
import { CardItemComponent } from '../../components/card-item/card-item.component';
import { CommonModule, AsyncPipe } from '@angular/common';
import { ConfigService } from '../../../services/config.service';
import { TuiAlertService } from '@taiga-ui/core';
import { Inject } from '@angular/core';
import { UserAchievementsRepositoryService } from '../../../repositories/user-achievements-repository.service';
import { UserAchievementsService } from '../../../services/user-achievements.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-page-catalog-item',
  standalone: true,
  imports: [CardItemComponent, CommonModule, AsyncPipe],
  templateUrl: './page-catalog-item.component.html',
  styleUrls: ['./page-catalog-item.component.css', '../../../styles/root.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageCatalogItemComponent implements OnInit {
  products$!: Observable<IDpProduct[]>; // Используем ! для строгой типизации
  isLoading = false;

  constructor(
    private productsRepository: ProductsRepositoryService,
    private userAchievementsRepository: UserAchievementsRepositoryService,
    private userAchievementsService: UserAchievementsService,
    private configService: ConfigService,
    private cd: ChangeDetectorRef,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.loadProductsOrFail();
  }

  loadProductsOrFail(): void {
    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    this.isLoading = true;
    this.cd.markForCheck();

    if (this.userAchievementsService.getAlwaysFailMode() && Math.random() < 0.5) {
      this.userAchievementsRepository
        .handleAchievement(
          userProjId,
          this.configService.achievementIds.loadProductsFailed,
          'тест-кейс: ошибка загрузки каталога продуктов! (режим всегда ошибка, рандом)'
        )
        .subscribe(() => {
          this.isLoading = false;
          this.products$ = of([]); // Пустой список при ошибке
          this.cd.markForCheck();
        });
      return;
    }

    this.loadProducts(userProjId);
  }

  private loadProducts(userProjId: number): void {
    this.products$ = this.productsRepository.getAllProducts();
    this.products$.subscribe({
      next: (productList: IDpProduct[]) => {
        const imagesCount = productList.reduce((sum, p) => sum + (p.dpImages?.length || 0), 0);
        console.log(`[Catalog] Загружено товаров: ${productList.length}`);
        console.log(`[Catalog] Всего изображений у товаров: ${imagesCount}`);
        this.isLoading = false;
        this.userAchievementsRepository
          .handleAchievement(
            userProjId,
            this.configService.achievementIds.loadProductsSuccess,
            'тест-кейс: каталог продуктов успешно загружен!'
          )
          .subscribe();
        this.cd.markForCheck();
      },
      error: (error) => {
        console.error('Ошибка при загрузке товаров:', error);
        this.isLoading = false;
        this.products$ = of([]);
        this.userAchievementsRepository
          .handleAchievement(
            userProjId,
            this.configService.achievementIds.loadProductsFailed,
            'тест-кейс: ошибка загрузки каталога продуктов!'
          )
          .subscribe();
        this.alertService.open('Не удалось загрузить каталог продуктов', { appearance: 'error' }).subscribe();
        this.cd.markForCheck();
      }
    });
  }

  trackByProductId(index: number, product: IDpProduct): number {
    return product.dpProductId;
  }
}