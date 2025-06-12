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
    private configService: ConfigService,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    this.productsRepository.getAllProducts().subscribe({
      next: (productList: IDpProduct[]) => {
        this.products = productList;
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.loadProductsSuccess, 'Достижение: каталог продуктов успешно загружен!')
          .subscribe();
        // this.alertService.open('Каталог успешно загружен!', { appearance: 'success' }).subscribe();
      },
      error: (error) => {
        console.error('Ошибка при загрузке товаров:', error);
        this.userAchievementsRepository
          .handleAchievement(userProjId, this.configService.achievementIds.loadProductsFailed, 'Достижение: ошибка загрузки каталога продуктов!')
          .subscribe();
        this.alertService.open('Не удалось загрузить каталог продуктов', { appearance: 'error' }).subscribe();
      }
    });
  }
}