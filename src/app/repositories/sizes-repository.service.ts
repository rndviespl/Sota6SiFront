import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpSize } from '../interface/IDpSize';
import { DpSizesService } from '../services/dp-sizes.service';

@Injectable({
  providedIn: 'root'
})
export class SizesRepositoryService {
  constructor(private dpSizesService: DpSizesService) {}

  getAllDpSizes(): Observable<IDpSize[]> {
    return this.dpSizesService.getAllDpSizes();
  }

  getDpSizeById(id: number): Observable<IDpSize> {
    return this.dpSizesService.getDpSizeById(id);
  }

  createDpSize(dpSize: IDpSize): Observable<IDpSize> {
    return this.dpSizesService.createDpSize(dpSize);
  }

  updateDpSize(id: number, dpSize: IDpSize): Observable<void> {
    return this.dpSizesService.updateDpSize(id, dpSize);
  }

  deleteDpSize(id: number): Observable<void> {
    return this.dpSizesService.deleteDpSize(id);
  }
}
