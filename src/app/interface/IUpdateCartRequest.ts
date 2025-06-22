// UpdateCartRequest.ts

/**
 * Интерфейс запроса на обновление количества товара в корзине.
 *
 * @property {number} productId - Идентификатор товара.
 * @property {number} quantity - Новое количество товара.
 * @property {number} [sizeId] - Идентификатор размера (опционально).
 *
 * @example
 * const req: IUpdateCartRequest = {
 *   productId: 3,
 *   quantity: 5,
 *   sizeId: 1
 * };
 */
export interface IUpdateCartRequest {
    productId: number;
    quantity: number;
    sizeId?: number;
}
