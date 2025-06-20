import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpImage } from '../interface/IDpImage';
import { ICreateDpImageRequest } from '../interface/ICreateDpImageRequest';
import { IUpdateDpImageRequest } from '../interface/IUpdateDpImageRequest';

@Injectable({
  providedIn: 'root'
})
export class DpImagesService {
  private baseUrl = `${window.location.origin}/api/DpImages`;

  constructor(private http: HttpClient) {}

 getAllDpImages(): Observable<IDpImage[]> {
    console.log('[DpImagesService] HTTP GET всех изображений');
    return this.http.get<IDpImage[]>(this.baseUrl);
}

getDpImagesByProductId(productId: number): Observable<IDpImage[]> {
    console.log(`[DpImagesService] HTTP GET изображений для товара ${productId}`);
    return this.http.get<IDpImage[]>(`${this.baseUrl}/ByProduct/${productId}`);
}

  getDpImageById(id: number): Observable<IDpImage> {
    return this.http.get<IDpImage>(`${this.baseUrl}/${id}`);
  }

  getDpImageData(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/image`, { responseType: 'blob' });
  }

  createDpImage(request: ICreateDpImageRequest): Observable<IDpImage> {
    const formData = new FormData();
    formData.append('DpProductId', request.dpProductId.toString());
    formData.append('DpImageTitle', request.dpImageTitle);
    formData.append('File', request.file);

    return this.http.post<IDpImage>(this.baseUrl, formData);
  }

  updateDpImage(id: number, request: IUpdateDpImageRequest): Observable<void> {
    const formData = new FormData();
    formData.append('DpProductId', request.dpProductId.toString());
    formData.append('DpImageTitle', request.dpImageTitle);
    if (request.file) {
      formData.append('File', request.file);
    }

    return this.http.put<void>(`${this.baseUrl}/${id}`, formData);
  }

  deleteDpImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
