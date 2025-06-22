// CreateDpImageRequest.ts

/**
 * Запрос на создание изображения товара.
 *
 * @property {number} dpProductId - Идентификатор товара.
 * @property {string} dpImageTitle - Название изображения.
 * @property {File} file - Файл изображения.
 *
 * @example
 * const req: ICreateDpImageRequest = { dpProductId: 1, dpImageTitle: 'Фото', file };
 */
export interface ICreateDpImageRequest {
    dpProductId: number;
    dpImageTitle: string;
    file: File;
}
