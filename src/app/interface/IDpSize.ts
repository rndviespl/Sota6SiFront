import { IDpCategory } from "./IDpCategory";
import { IDpProductAttribute } from "./IDpProductAttribute";

/**
 * Интерфейс для размера товара (Size).
 *
 * @property {number} sizeId - Уникальный идентификатор размера.
 * @property {string} size - Название или обозначение размера (например, "42", "M").
 * @property {IDpProductAttribute[]} [dpProductAttributes] - Список атрибутов товаров с этим размером (опционально).
 * @property {IDpCategory[]} [dpCategories] - Список категорий, связанных с этим размером (опционально).
 *
 * @example
 * const size: IDpSize = {
 *   sizeId: 1,
 *   size: '42',
 *   dpProductAttributes: [{ dpAttributesId: 1, ... }],
 *   dpCategories: [{ dpCategoryId: 2, dpCategoryTitle: 'Обувь', ... }]
 * };
 */
export interface IDpSize {
    sizeId: number;
    size: string;
    dpProductAttributes?: IDpProductAttribute[];
    dpCategories?: IDpCategory[];
}
