import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpProductAttribute } from '../interface/IDpProductAttribute';
import { DpProductAttributesService } from '../services/dp-product-attributes.service';

@Injectable({
  providedIn: 'root'
})
export class ProductAttributesRepositoryService {
  constructor(private dpProductAttributesService: DpProductAttributesService) {}

  getAllDpProductAttributes(): Observable<IDpProductAttribute[]> {
    return this.dpProductAttributesService.getAllDpProductAttributes();
  }

  getDpProductAttributeById(id: number): Observable<IDpProductAttribute> {
    return this.dpProductAttributesService.getDpProductAttributeById(id);
  }

  createDpProductAttribute(dpProductAttribute: IDpProductAttribute): Observable<IDpProductAttribute> {
    return this.dpProductAttributesService.createDpProductAttribute(dpProductAttribute);
  }

  updateDpProductAttribute(id: number, dpProductAttribute: IDpProductAttribute): Observable<void> {
    return this.dpProductAttributesService.updateDpProductAttribute(id, dpProductAttribute);
  }

  deleteDpProductAttribute(id: number): Observable<void> {
    return this.dpProductAttributesService.deleteDpProductAttribute(id);
  }
}
