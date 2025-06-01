import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { IDpProduct } from '../../../interface/IDpProduct';
import { CommonModule } from '@angular/common';
import { TuiAppearance, TuiButton } from '@taiga-ui/core';
import { CarouselImgComponent } from '../carousel-img/carousel-img.component';
import { IDpImage } from '../../../interface/IDpImage';
import { Router } from '@angular/router';
import { UserAchievementsRepositoryService } from '../../../repositories/user-achievements-repository.service';

@Component({
  selector: 'app-card-item',
  imports: [
    CommonModule,
    TuiAppearance,
    TuiButton,
    CarouselImgComponent
  ],
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css', '../../../styles/root.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CardItemComponent {
  @Input() productInfo!: IDpProduct;

  constructor(
    private router: Router,
    private userAchievementsRepository: UserAchievementsRepositoryService
  ) {}

  get images(): IDpImage[] {
    return this.productInfo.dpImages || [];
  }

  navigateToProduct(product: IDpProduct): void {
    const userProjId = parseInt(localStorage.getItem('userProjId') || '0', 10);
    this.router.navigate(['/ItemFromCatalog', product.dpProductId])
      .then(success => {
        if (success) {
          this.userAchievementsRepository.handleAchievement(userProjId, 'navigateToProductSuccess', 'тест-кейс: Переход к товару выполнен!').subscribe();
        } else {
          this.userAchievementsRepository.handleAchievement(userProjId, 'navigateToProductFailed', 'тест-кейс: Ошибка перехода к товару!').subscribe();
        }
      })
      .catch(() => {
        this.userAchievementsRepository.handleAchievement(userProjId, 'navigateToProductFailed', 'тест-кейс: Ошибка перехода к товару!').subscribe();
      });
  }
}