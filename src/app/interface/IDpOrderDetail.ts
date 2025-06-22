// DpOrderDetail.ts

/**
 * Интерфейс для детализации заказа (Order Detail).
 *
 * @property {string} [productTitle] - Название товара (опционально).
 * @property {number} quantity - Количество товара.
 * @property {number} [sizeId] - Идентификатор размера (опционально).
 * @property {string} sizeName - Название размера.
 * @property {number} unitPrice - Цена за единицу товара.
 * @property {number} totalPrice - Общая стоимость позиции.
 *
 * @example
 * const detail: IDpOrderDetail = {
 *   productTitle: 'Кроссовки',
 *   quantity: 2,
 *   sizeId: 3,
 *   sizeName: '42',
 *   unitPrice: 1500,
 *   totalPrice: 3000
 * };
 */
export interface IDpOrderDetail {
    productTitle?: string;
    quantity: number;
    sizeId?: number;
    sizeName: string;
    unitPrice: number;
    totalPrice: number;
}
