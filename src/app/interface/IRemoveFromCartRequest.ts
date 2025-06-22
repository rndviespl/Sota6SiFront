// RemoveFromCartRequest.ts

/**
 * Интерфейс запроса на удаление товара из корзины.
 *
 * @property {number} productId - Идентификатор товара.
 * @property {number} [sizeId] - Идентификатор размера (опционально).
 *
 * @example
 * const req: IRemoveFromCartRequest = {
 *   productId: 5,
 *   sizeId: 2
 * };
 */
export interface IRemoveFromCartRequest {
    productId: number;
    sizeId?: number;
}
