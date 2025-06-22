import { IDpUser } from "./IDpUser";

/**
 * Интерфейс для заказа (Order).
 *
 * @property {number} dpOrderId - Уникальный идентификатор заказа.
 * @property {number} dpUserId - Идентификатор пользователя, оформившего заказ.
 * @property {Date} dpDateTimeOrder - Дата и время оформления заказа.
 * @property {string} [dpTypeOrder] - Тип заказа (опционально).
 * @property {IDpUser} dpUser - Объект пользователя, связанный с заказом.
 *
 * @example
 * const order: IDpOrder = {
 *   dpOrderId: 1,
 *   dpUserId: 2,
 *   dpDateTimeOrder: new Date(),
 *   dpTypeOrder: 'website',
 *   dpUser: { dpUserId: 2, dpUsername: 'vasya', ... }
 * };
 */
export interface IDpOrder {
    dpOrderId: number;
    dpUserId: number;
    dpDateTimeOrder: Date;
    dpTypeOrder?: string;
    dpUser: IDpUser;
}
