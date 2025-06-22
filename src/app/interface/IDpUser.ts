import { IDpOrder } from "./IDpOrder";

/**
 * Интерфейс для пользователя (User).
 *
 * @property {number} dpUserId - Уникальный идентификатор пользователя.
 * @property {string} dpUsername - Имя пользователя (логин).
 * @property {string} dpPassword - Пароль пользователя.
 * @property {string} [dpEmail] - Email пользователя (опционально).
 * @property {string} [dpFullName] - Полное имя пользователя (опционально).
 * @property {Date} dpRegistrationDate - Дата регистрации пользователя.
 * @property {string} [dpPhoneNumber] - Телефон пользователя (опционально).
 * @property {IDpOrder[]} [dpOrders] - Список заказов пользователя (опционально).
 *
 * @example
 * const user: IDpUser = {
 *   dpUserId: 1,
 *   dpUsername: 'vasya',
 *   dpPassword: '123456',
 *   dpRegistrationDate: new Date(),
 *   dpEmail: 'vasya@example.com',
 *   dpFullName: 'Василий Иванов',
 *   dpPhoneNumber: '+79991234567',
 *   dpOrders: [{ dpOrderId: 1, dpUserId: 1, ... }]
 * };
 */
export interface IDpUser {
    dpUserId: number;
    dpUsername: string;
    dpPassword: string;
    dpEmail?: string;
    dpFullName?: string;
    dpRegistrationDate: Date;
    dpPhoneNumber?: string;
    dpOrders?: IDpOrder[];
}
