// CartItem.ts

/**
 * Элемент корзины.
 *
 * @property {number} productId - Идентификатор товара.
 * @property {string} productTitle - Название товара.
 * @property {number} price - Цена.
 * @property {number} quantity - Количество.
 * @property {number} [sizeId] - Идентификатор размера (опционально).
 *
 * @example
 * const item: ICartItem = { productId: 1, productTitle: 'Кроссовки', price: 1000, quantity: 2, sizeId: 3 };
 */
export interface ICartItem {
    productId: number;
    productTitle: string;
    price: number;
    quantity: number;
    sizeId?: number;
}
