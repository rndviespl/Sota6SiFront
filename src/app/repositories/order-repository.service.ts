import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpOrder } from '../interface/IDpOrder';
import { DpOrdersService } from '../services/dp-orders.service';

/**
 * @ignore
 */

@Injectable({
  providedIn: 'root'
})
export class OrderRepositoryService {
  constructor(private dpOrdersService: DpOrdersService) {}

  getAllDpOrders(): Observable<IDpOrder[]> {
    return this.dpOrdersService.getAllDpOrders();
  }

  getDpOrderById(id: number): Observable<IDpOrder> {
    return this.dpOrdersService.getDpOrderById(id);
  }

  createDpOrder(dpOrder: IDpOrder): Observable<IDpOrder> {
    return this.dpOrdersService.createDpOrder(dpOrder);
  }

  updateDpOrder(id: number, dpOrder: IDpOrder): Observable<void> {
    return this.dpOrdersService.updateDpOrder(id, dpOrder);
  }

  deleteDpOrder(id: number): Observable<void> {
    return this.dpOrdersService.deleteDpOrder(id);
  }
}
