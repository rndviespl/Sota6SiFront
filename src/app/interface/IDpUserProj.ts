import { IAchievement } from "./IAchievement";

/**
 * Интерфейс для пользователя проекта (User Project).
 *
 * @property {number} dpUserProjId - Уникальный идентификатор пользователя проекта.
 * @property {string} [email] - Email пользователя (опционально).
 * @property {string} password - Пароль пользователя.
 * @property {string} login - Логин пользователя.
 * @property {IAchievement[]} [achievements] - Список достижений пользователя (опционально).
 *
 * @example
 * const userProj: IDpUserProj = {
 *   dpUserProjId: 1,
 *   login: 'vasya',
 *   password: 'qwerty',
 *   email: 'vasya@example.com',
 *   achievements: [{ achievementId: 1, title: 'Первый вход' }]
 * };
 */
export interface IDpUserProj {
    dpUserProjId: number;
    email?: string;
    password: string;
    login: string;
    achievements?: IAchievement[];
}
