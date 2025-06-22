import { IDpSize } from "./IDpSize";
import { IDpProduct } from "./IDpProduct";

/**
 * Категория товара.
 *
 * @property {number} dpCategoryId - Идентификатор категории.
 * @property {string} dpCategoryTitle - Название категории.
 * @property {number} sizeId - Идентификатор размера.
 * @property {IDpSize} size - Размер.
 * @property {IDpProduct[]} [dpProducts] - Товары в категории (опционально).
 *
 * @example
 * const cat: IDpCategory = { dpCategoryId: 1, dpCategoryTitle: 'Обувь', sizeId: 2, size: {...} };
 */
export interface IDpCategory {
    dpCategoryId: number;
    dpCategoryTitle: string;
    sizeId: number;
    size: IDpSize;
    dpProducts?: IDpProduct[];
}
