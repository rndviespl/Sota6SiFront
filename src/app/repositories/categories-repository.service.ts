import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpCategory } from '../interface/IDpCategory';
import { DpCategoriesService } from '../services/dp-categories.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesRepositoryService {
  constructor(private dpCategoriesService: DpCategoriesService) {}

  getAllDpCategories(): Observable<IDpCategory[]> {
    return this.dpCategoriesService.getAllDpCategories();
  }

  getDpCategoryById(id: number): Observable<IDpCategory> {
    return this.dpCategoriesService.getDpCategoryById(id);
  }

  createDpCategory(dpCategory: IDpCategory): Observable<IDpCategory> {
    return this.dpCategoriesService.createDpCategory(dpCategory);
  }

  updateDpCategory(id: number, dpCategory: IDpCategory): Observable<void> {
    return this.dpCategoriesService.updateDpCategory(id, dpCategory);
  }

  deleteDpCategory(id: number): Observable<void> {
    return this.dpCategoriesService.deleteDpCategory(id);
  }
}
