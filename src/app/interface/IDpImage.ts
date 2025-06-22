import { IDpProduct } from "./IDpProduct";

/**
 * Изображение товара.
 *
 * @property {number} dpImagesId - Идентификатор изображения.
 * @property {number} dpProductId - Идентификатор товара.
 * @property {string} dpImageTitle - Название изображения.
 * @property {Uint8Array} [imagesData] - Данные изображения (опционально).
 * @property {IDpProduct} dpProduct - Товар.
 *
 * @example
 * const img: IDpImage = { dpImagesId: 1, dpProductId: 2, dpImageTitle: 'Фото', dpProduct: {...} };
 */
export interface IDpImage {
    dpImagesId: number;
    dpProductId: number;
    dpImageTitle: string;
    imagesData?: Uint8Array;
    dpProduct: IDpProduct;
}
