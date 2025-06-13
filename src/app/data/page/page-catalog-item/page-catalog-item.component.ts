// src/app/components/page-catalog-item/page-catalog-item.component.ts
import { Component, OnInit } from '@angular/core';
import { IDpProduct } from '../../../interface/IDpProduct';
import { ProductsRepositoryService } from '../../../repositories/products-repository.service';
import { CardItemComponent } from '../../components/card-item/card-item.component';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../../services/config.service';
import { TuiAlertService } from '@taiga-ui/core';
import { Inject } from '@angular/core';
import { UserAchievementsRepositoryService } from '../../../repositories/user-achievements-repository.service';
import { UserAchievementsService } from '../../../services/user-achievements.service';

@Component({
  selector: 'app-page-catalog-item',
  imports: [CardItemComponent, CommonModule],
  templateUrl: './page-catalog-item.component.html',
  styleUrls: ['./page-catalog-item.component.css', '../../../styles/root.css']
})
export class PageCatalogItemComponent implements OnInit {
  products: IDpProduct[] = [];

  constructor(
    private productsRepository: ProductsRepositoryService,
    private userAchievementsRepository: UserAchievementsRepositoryService,
    private userAchievementsService: UserAchievementsService,
    private configService: ConfigService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) { }

  ngOnInit(): void {
    this.loadProductsOrFail();
  }

  loadProductsOrFail() {
    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);

    if (this.userAchievementsService.getAlwaysFailMode()) {
      // Галочка включена — 50% шанс на ошибку
      if (Math.random() < 0.5) {
        this.userAchievementsRepository.handleAchievement(
          userProjId,
          this.configService.achievementIds.loadProductsFailed,
          'тест-кейс: ошибка загрузки каталога продуктов! (режим всегда ошибка, рандом)'
        ).subscribe();
        return;
      }
      // 50% шанс — обычная загрузка
    }

    // Галочка выключена или выпал шанс на успех — обычная загрузка
    this.loadProducts(userProjId);
  }

  private loadProducts(userProjId: number): void {
    this.productsRepository.getAllProducts().subscribe({
      next: (productList: IDpProduct[]) => {
        this.products = productList;
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.loadProductsSuccess, 'тест-кейс: каталог продуктов успешно загружен!')
          .subscribe();
        // this.alertService.open('Каталог успешно загружен!', { appearance: 'success' }).subscribe();
      },
      error: (error) => {
        console.error('Ошибка при загрузке товаров:', error);
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.loadProductsFailed, 'тест-кейс: ошибка загрузки каталога продуктов!')
          .subscribe();
        this.alertService.open('Не удалось загрузить каталог продуктов', { appearance: 'error' }).subscribe();
      }
    });
  }
}