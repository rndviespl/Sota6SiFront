import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateDpImageRequest } from '../interface/ICreateDpImageRequest';
import { IDpImage } from '../interface/IDpImage';
import { IUpdateDpImageRequest } from '../interface/IUpdateDpImageRequest';
import { DpImagesService } from '../services/dp-images.service';

@Injectable({
  providedIn: 'root'
})
export class ImagesRepositoryService {
  constructor(private dpImagesService: DpImagesService) {}

  getAllDpImages(): Observable<IDpImage[]> {
    return this.dpImagesService.getAllDpImages();
  }

  getDpImageById(id: number): Observable<IDpImage> {
    return this.dpImagesService.getDpImageById(id);
  }

  getDpImageData(id: number): Observable<Blob> {
    return this.dpImagesService.getDpImageData(id);
  }

  createDpImage(request: ICreateDpImageRequest): Observable<IDpImage> {
    return this.dpImagesService.createDpImage(request);
  }

  updateDpImage(id: number, request: IUpdateDpImageRequest): Observable<void> {
    return this.dpImagesService.updateDpImage(id, request);
  }

  deleteDpImage(id: number): Observable<void> {
    return this.dpImagesService.deleteDpImage(id);
  }
}
