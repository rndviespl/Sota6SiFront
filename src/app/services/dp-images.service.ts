import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpImage } from '../interface/IDpImage';
import { ICreateDpImageRequest } from '../interface/ICreateDpImageRequest';
import { IUpdateDpImageRequest } from '../interface/IUpdateDpImageRequest';

/**
 * Сервис для работы с изображениями товаров.
 *
 * @remarks
 * Позволяет получать, создавать, обновлять и удалять изображения, а также получать бинарные данные изображения.
 */
@Injectable({
  providedIn: 'root'
})
export class DpImagesService {
  private baseUrl = `${window.location.origin}/api/DpImages`;

  constructor(private http: HttpClient) {}

  /**
   * Получает список всех изображений.
   *
   * @returns {Observable<IDpImage[]>} Список всех изображений.
   * @example
   * // GET /api/DpImages
   * this.dpImagesService.getAllDpImages().subscribe(images => {
   *   // images: [{ DpImagesId, DpProductId, DpImageTitle, ImagesData }]
   *   console.log(images);
   * });
   */
  getAllDpImages(): Observable<IDpImage[]> {
    return this.http.get<IDpImage[]>(this.baseUrl);
  }

  /**
   * Получает изображения по идентификатору товара.
   *
   * @param {number} productId Идентификатор товара.
   * @returns {Observable<IDpImage[]>} Список изображений для товара.
   * @example
   * // GET /api/DpImages/ByProduct/5
   * this.dpImagesService.getDpImagesByProductId(5).subscribe(images => {
   *   // images: [{ DpImagesId, DpProductId, DpImageTitle, ImagesData }]
   * });
   */
  getDpImagesByProductId(productId: number): Observable<IDpImage[]> {
    return this.http.get<IDpImage[]>(`${this.baseUrl}/ByProduct/${productId}`);
  }

  /**
   * Получает изображение по его идентификатору.
   *
   * @param {number} id Идентификатор изображения.
   * @returns {Observable<IDpImage>} Объект изображения.
   * @example
   * // GET /api/DpImages/10
   * this.dpImagesService.getDpImageById(10).subscribe(image => {
   *   // image: { DpImagesId, DpProductId, DpImageTitle, ImagesData }
   * });
   */
  getDpImageById(id: number): Observable<IDpImage> {
    return this.http.get<IDpImage>(`${this.baseUrl}/${id}`);
  }

  /**
   * Получает бинарные данные изображения (Blob) по идентификатору.
   *
   * @param {number} id Идентификатор изображения.
   * @returns {Observable<Blob>} Бинарные данные изображения.
   * @example
   * // GET /api/DpImages/10/image
   * this.dpImagesService.getDpImageData(10).subscribe(blob => {
   *   const url = URL.createObjectURL(blob);
   *   window.open(url);
   * });
   */
  getDpImageData(id: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/${id}/image`, { responseType: 'blob' });
  }

  /**
   * Создаёт новое изображение для товара.
   *
   * @param {ICreateDpImageRequest} request Данные для создания изображения.
   * @returns {Observable<IDpImage>} Созданное изображение.
   * @example
   * // POST /api/DpImages (multipart/form-data)
   * // FormData:
   * // DpProductId: 5
   * // DpImageTitle: "Фото товара"
   * // File: (binary image file)
   * const file = ...; // File из input[type="file"]
   * const formData = new FormData();
   * formData.append('DpProductId', '5');
   * formData.append('DpImageTitle', 'Фото товара');
   * formData.append('File', file);
   * this.http.post('/api/DpImages', formData).subscribe(image => {
   *   // image: { DpImagesId, DpProductId, DpImageTitle, ImagesData }
   * });
   *
   * // Или через сервис:
   * this.dpImagesService.createDpImage({
   *   dpProductId: 5,
   *   dpImageTitle: 'Фото товара',
   *   file
   * }).subscribe(image => console.log(image));
   */
  createDpImage(request: ICreateDpImageRequest): Observable<IDpImage> {
    const formData = new FormData();
    formData.append('DpProductId', request.dpProductId.toString());
    formData.append('DpImageTitle', request.dpImageTitle);
    formData.append('File', request.file);

    return this.http.post<IDpImage>(this.baseUrl, formData);
  }

  /**
   * Обновляет существующее изображение.
   *
   * @param {number} id Идентификатор изображения.
   * @param {IUpdateDpImageRequest} request Данные для обновления изображения.
   * @returns {Observable<void>} Результат обновления.
   * @example
   * // PUT /api/DpImages/10 (multipart/form-data)
   * // FormData:
   * // DpProductId: 5
   * // DpImageTitle: "Новое название"
   * // File: (binary image file, опционально)
   * const file = ...; // Новый файл или undefined
   * const formData = new FormData();
   * formData.append('DpProductId', '5');
   * formData.append('DpImageTitle', 'Новое название');
   * if (file) formData.append('File', file);
   * this.http.put('/api/DpImages/10', formData).subscribe(() => {
   *   console.log('Изображение обновлено');
   * });
   */
  updateDpImage(id: number, request: IUpdateDpImageRequest): Observable<void> {
    const formData = new FormData();
    formData.append('DpProductId', request.dpProductId.toString());
    formData.append('DpImageTitle', request.dpImageTitle);
    if (request.file) {
      formData.append('File', request.file);
    }

    return this.http.put<void>(`${this.baseUrl}/${id}`, formData);
  }

  /**
   * Удаляет изображение по идентификатору.
   *
   * @param {number} id Идентификатор изображения.
   * @returns {Observable<void>} Результат удаления.
   * @example
   * this.dpImagesService.deleteDpImage(10).subscribe(() => console.log('Удалено'));
   */
  deleteDpImage(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
