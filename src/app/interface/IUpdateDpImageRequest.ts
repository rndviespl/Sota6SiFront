// UpdateDpImageRequest.ts

/**
 * Интерфейс запроса на обновление изображения товара.
 *
 * @property {number} dpProductId - Идентификатор товара.
 * @property {string} dpImageTitle - Новое название изображения.
 * @property {File} [file] - Новый файл изображения (опционально).
 *
 * @example
 * const req: IUpdateDpImageRequest = {
 *   dpProductId: 1,
 *   dpImageTitle: 'Новое фото',
 *   file: selectedFile
 * };
 */
export interface IUpdateDpImageRequest {
    dpProductId: number;
    dpImageTitle: string;
    file?: File;
}
