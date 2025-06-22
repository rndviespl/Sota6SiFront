import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap, map, switchMap, forkJoin, of } from 'rxjs';
import { ICreateDpImageRequest } from '../interface/ICreateDpImageRequest';
import { IDpImage } from '../interface/IDpImage';
import { IUpdateDpImageRequest } from '../interface/IUpdateDpImageRequest';
import { DpImagesService } from '../services/dp-images.service';

/**
 * @ignore
 */

@Injectable({
  providedIn: 'root'
})
export class ImagesRepositoryService {
  private imagesListCache$: Observable<IDpImage[]> | null = null;
  private imagesDataCache: Map<number, Observable<Blob>> = new Map();

  constructor(private dpImagesService: DpImagesService) {}

 getAllDpImages(): Observable<IDpImage[]> {
    if (!this.imagesListCache$) {
      this.imagesListCache$ = this.dpImagesService.getAllDpImages().pipe(
        shareReplay(1)
      );
    }
    return this.imagesListCache$;
  }

getAllDpImagesWithData(): Observable<IDpImage[]> {
    return this.getAllDpImages().pipe(
      switchMap((images: IDpImage[]) => {
        if (!images.length) {
          return of([] as IDpImage[]);
        }
        const requests: Observable<{ image: IDpImage; blob: Blob }>[] = images.map(image =>
          this.getDpImageData(image.dpImagesId).pipe(
            map(blob => ({ image, blob }))
          )
        );
        return forkJoin(requests).pipe(
          map((results: { image: IDpImage; blob: Blob }[]) =>
            results.map(({ image }) => ({
              ...image,
              blob: undefined as Blob | undefined // Явно указываем тип
            } as IDpImage)) // Приводим к IDpImage
          )
        );
      })
    );
  }

  getDpImagesByProductId(productId: number): Observable<IDpImage[]> {
    return this.getAllDpImages().pipe(
      map(images => images.filter(img => img.dpProductId === productId))
    );
  }

  getDpImageById(id: number): Observable<IDpImage> {
    return this.dpImagesService.getDpImageById(id);
  }

  getDpImageData(id: number): Observable<Blob> {
    const cached = this.imagesDataCache.get(id);
    if (cached) {
      return cached;
    }
    const image$ = this.dpImagesService.getDpImageData(id).pipe(
      shareReplay(1)
    );
    this.imagesDataCache.set(id, image$);
    return image$;
  }

  createDpImage(request: ICreateDpImageRequest): Observable<IDpImage> {
    return this.dpImagesService.createDpImage(request).pipe(
      tap(() => {
        this.imagesListCache$ = null;
        this.imagesDataCache.clear();
      })
    );
  }

  updateDpImage(id: number, request: IUpdateDpImageRequest): Observable<void> {
    return this.dpImagesService.updateDpImage(id, request).pipe(
      tap(() => {
        this.imagesListCache$ = null;
        this.imagesDataCache.delete(id);
      })
    );
  }

  deleteDpImage(id: number): Observable<void> {
    return this.dpImagesService.deleteDpImage(id).pipe(
      tap(() => {
        this.imagesListCache$ = null;
        this.imagesDataCache.delete(id);
      })
    );
  }
}

