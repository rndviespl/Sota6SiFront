import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDpProduct } from '../interface/IDpProduct';
import { IAddToCartRequest } from '../interface/IAddToCartRequest';

/**
 * Сервис для работы с товарами (Products).
 *
 * @remarks
 * Позволяет получать, создавать, обновлять, удалять товары, а также добавлять товары в корзину через API.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseUrl = `${window.location.origin}/api/Products`;

  constructor(private http: HttpClient) {}

  /**
   * Получает список всех товаров.
   *
   * @returns {Observable<IDpProduct[]>} Список товаров.
   * @example
   * // GET /api/Products
   * this.productsService.getAllProducts().subscribe(products => {
   *   // products: [{ dpProductId, dpProductTitle, ... }]
   *   console.log(products);
   * });
   */
  getAllProducts(): Observable<IDpProduct[]> {
    return this.http.get<IDpProduct[]>(this.baseUrl);
  }

  /**
   * Получает товар по его идентификатору.
   *
   * @param {number} id Идентификатор товара.
   * @returns {Observable<IDpProduct>} Товар.
   * @example
   * // GET /api/Products/1
   * this.productsService.getProductById(1).subscribe(product => {
   *   // product: { dpProductId, dpProductTitle, ... }
   * });
   */
  getProductById(id: number): Observable<IDpProduct> {
    return this.http.get<IDpProduct>(`${this.baseUrl}/${id}`);
  }

  /**
   * Создаёт новый товар.
   *
   * @param {IDpProduct} product Объект товара.
   * @returns {Observable<IDpProduct>} Созданный товар.
   * @example
   * // POST /api/Products
   * // Body:
   * // {
   * //   "dpProductId": 0,
   * //   "dpProductTitle": "Кроссовки",
   * //   "dpCategoryId": 2,
   * //   "dpProductDescription": "Описание товара",
   * //   ...другие поля...
   * // }
   * this.productsService.createProduct({
   *   dpProductId: 0,
   *   dpProductTitle: 'Кроссовки',
   *   dpCategoryId: 2,
   *   dpProductDescription: 'Описание товара'
   * }).subscribe(newProduct => {
   *   // newProduct: { ... }
   * });
   */
  createProduct(product: IDpProduct): Observable<IDpProduct> {
    return this.http.post<IDpProduct>(this.baseUrl, product);
  }

  /**
   * Обновляет существующий товар.
   *
   * @param {number} id Идентификатор товара.
   * @param {IDpProduct} product Обновлённый объект товара.
   * @returns {Observable<void>} Результат обновления.
   * @example
   * // PUT /api/Products/1
   * // Body:
   * // {
   * //   "dpProductId": 1,
   * //   "dpProductTitle": "Обновлённый товар",
   * //   "dpCategoryId": 2,
   * //   ...другие поля...
   * // }
   * this.productsService.updateProduct(1, {
   *   dpProductId: 1,
   *   dpProductTitle: 'Обновлённый товар',
   *   dpCategoryId: 2
   * }).subscribe(() => {
   *   // Товар обновлён
   * });
   */
  updateProduct(id: number, product: IDpProduct): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${id}`, product);
  }

  /**
   * Удаляет товар по идентификатору.
   *
   * @param {number} id Идентификатор товара.
   * @returns {Observable<void>} Результат удаления.
   * @example
   * // DELETE /api/Products/1
   * this.productsService.deleteProduct(1).subscribe(() => {
   *   // Товар удалён
   * });
   */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /**
   * Добавляет товар в корзину.
   *
   * @param {IAddToCartRequest} request Данные для добавления в корзину.
   * @returns {Observable<{ success: boolean; message: string }>} Результат операции.
   * @example
   * // POST /api/Products/AddToCart
   * // Body:
   * // {
   * //   "productId": 1,
   * //   "quantity": 2,
   * //   "sizeId": 3
   * // }
   * this.productsService.addToCart({
   *   productId: 1,
   *   quantity: 2,
   *   sizeId: 3
   * }).subscribe(res => {
   *   // res: { success: true, message: "Product added to cart." }
   * });
   */
  addToCart(request: IAddToCartRequest): Observable<{ success: boolean; message: string }> {
    return this.http.post<{ success: boolean; message: string }>(`${this.baseUrl}/AddToCart`, request);
  }
}
