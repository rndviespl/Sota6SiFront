// AddToCartRequest.ts

/**
 * Запрос на добавление товара в корзину.
 *
 * @property {number} productId - Идентификатор товара.
 * @property {number} quantity - Количество.
 * @property {number} [sizeId] - Идентификатор размера (опционально).
 *
 * @example
 * const req: IAddToCartRequest = { productId: 5, quantity: 2, sizeId: 1 };
 */
export interface IAddToCartRequest {
    productId: number;
    quantity: number;
    sizeId?: number;
}
