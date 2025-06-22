import { IDpSize } from "./IDpSize";
import { IDpProduct } from "./IDpProduct";

/**
 * Интерфейс для атрибута товара (Product Attribute).
 *
 * @property {number} dpAttributesId - Уникальный идентификатор атрибута.
 * @property {number} dpProductId - Идентификатор товара.
 * @property {number} dpCount - Количество товара с этим атрибутом.
 * @property {number} [dpSize] - Идентификатор размера (опционально).
 * @property {IDpProduct} dpProduct - Объект товара.
 * @property {IDpSize} [dpSizeNavigation] - Объект размера (опционально).
 *
 * @example
 * const attr: IDpProductAttribute = {
 *   dpAttributesId: 1,
 *   dpProductId: 2,
 *   dpCount: 10,
 *   dpSize: 3,
 *   dpProduct: { dpProductId: 2, dpPrice: 1500, ... },
 *   dpSizeNavigation: { sizeId: 3, size: '42' }
 * };
 */
export interface IDpProductAttribute {
    dpAttributesId: number;
    dpProductId: number;
    dpCount: number;
    dpSize?: number;
    dpProduct: IDpProduct;
    dpSizeNavigation?: IDpSize;
}
