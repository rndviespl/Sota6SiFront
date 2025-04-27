import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAddToCartRequest } from '../interface/IAddToCartRequest';
import { IDpProduct } from '../interface/IDpProduct';
import { ProductsService } from '../services/dp-products.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsRepositoryService {
  constructor(private productsService: ProductsService) {}

  getAllProducts(): Observable<IDpProduct[]> {
    return this.productsService.getAllProducts();
  }

  getProductById(id: number): Observable<IDpProduct> {
    return this.productsService.getProductById(id);
  }

  createProduct(product: IDpProduct): Observable<IDpProduct> {
    return this.productsService.createProduct(product);
  }

  updateProduct(id: number, product: IDpProduct): Observable<void> {
    return this.productsService.updateProduct(id, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.productsService.deleteProduct(id);
  }

  addToCart(request: IAddToCartRequest): Observable<{ success: boolean; message: string }> {
    return this.productsService.addToCart(request);
  }
}