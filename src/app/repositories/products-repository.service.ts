import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { IAddToCartRequest } from '../interface/IAddToCartRequest';
import { IDpProduct } from '../interface/IDpProduct';
import { ProductsService } from '../services/dp-products.service';
import { ImagesRepositoryService } from './images-repository.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsRepositoryService {
  constructor(private productsService: ProductsService,
    private imagesRepository: ImagesRepositoryService
  ) {}

  getAllProducts(): Observable<IDpProduct[]> {
    return this.productsService.getAllProducts().pipe(
      switchMap((products: IDpProduct[]) => {
        const imageObservables = products.map(product =>
          this.imagesRepository.getAllDpImages().pipe(
            map(images => {
              product.dpImages = images.filter(image => image.dpProductId === product.dpProductId);
              return product;
            })
          )
        );
        return forkJoin(imageObservables);
      })
    );
  }
  
  getProductById(id: number): Observable<IDpProduct> {
    return this.productsService.getProductById(id).pipe(
      switchMap((product: IDpProduct) =>
        this.imagesRepository.getAllDpImages().pipe(
          map(images => {
            product.dpImages = images.filter(image => image.dpProductId === product.dpProductId);
            return product;
          })
        )
      )
    );
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