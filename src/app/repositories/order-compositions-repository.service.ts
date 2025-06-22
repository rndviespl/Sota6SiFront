import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpOrderComposition } from '../interface/IDpOrderComposition';
import { DpOrderCompositionsService } from '../services/dp-order-compositions.service';

/**
 * @ignore
 */

@Injectable({
  providedIn: 'root'
})
export class OrderCompositionsRepositoryService {
  constructor(private dpOrderCompositionsService: DpOrderCompositionsService) {}

  getAllDpOrderCompositions(): Observable<IDpOrderComposition[]> {
    return this.dpOrderCompositionsService.getAllDpOrderCompositions();
  }

  getDpOrderCompositionById(id: number): Observable<IDpOrderComposition> {
    return this.dpOrderCompositionsService.getDpOrderCompositionById(id);
  }

  createDpOrderComposition(dpOrderComposition: IDpOrderComposition): Observable<IDpOrderComposition> {
    return this.dpOrderCompositionsService.createDpOrderComposition(dpOrderComposition);
  }

  updateDpOrderComposition(id: number, dpOrderComposition: IDpOrderComposition): Observable<void> {
    return this.dpOrderCompositionsService.updateDpOrderComposition(id, dpOrderComposition);
  }

  deleteDpOrderComposition(id: number): Observable<void> {
    return this.dpOrderCompositionsService.deleteDpOrderComposition(id);
  }
}