import { IDpProductAttribute } from "./IDpProductAttribute";
import { IDpCategory } from "./IDpCategory";
import { IDpImage } from "./IDpImage";

/**
 * Интерфейс для товара (Product).
 *
 * @property {number} dpProductId - Уникальный идентификатор товара.
 * @property {number} dpPrice - Цена товара.
 * @property {string} dpTitle - Название товара.
 * @property {number} [dpDiscountPercent] - Процент скидки (опционально).
 * @property {string} [dpDescription] - Описание товара (опционально).
 * @property {number} [dpCategoryId] - Идентификатор категории (опционально).
 * @property {number} dpPurchasePrice - Закупочная цена товара.
 * @property {IDpCategory} [dpCategory] - Категория товара (опционально).
 * @property {IDpImage[]} [dpImages] - Массив изображений товара (опционально).
 * @property {IDpProductAttribute[]} [dpProductAttributes] - Массив атрибутов товара (опционально).
 *
 * @example
 * const product: IDpProduct = {
 *   dpProductId: 1,
 *   dpPrice: 1500,
 *   dpTitle: 'Кроссовки',
 *   dpPurchasePrice: 1000,
 *   dpDiscountPercent: 10,
 *   dpDescription: 'Удобные кроссовки для бега',
 *   dpCategoryId: 2,
 *   dpCategory: { dpCategoryId: 2, dpCategoryTitle: 'Обувь', ... },
 *   dpImages: [{ dpImagesId: 1, dpProductId: 1, dpImageTitle: 'Фото', ... }],
 *   dpProductAttributes: [{ dpAttributesId: 1, dpProductId: 1, dpCount: 5, ... }]
 * };
 */
export interface IDpProduct {
    dpProductId: number;
    dpPrice: number;
    dpTitle: string;
    dpDiscountPercent?: number;
    dpDescription?: string;
    dpCategoryId?: number;
    dpPurchasePrice: number;
    dpCategory?: IDpCategory;
    dpImages?: IDpImage[];
    dpProductAttributes?: IDpProductAttribute[];
}
