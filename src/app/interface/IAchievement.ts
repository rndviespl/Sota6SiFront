// Achievement.ts

import { IDpUserProj } from "./IDpUserProj";

/**
 * Интерфейс для объекта достижения (Achievement).
 *
 * @property {number} achievementId - Уникальный идентификатор достижения.
 * @property {string} title - Название достижения.
 * @property {string} [textAchievement] - Описание или дополнительный текст достижения (опционально).
 * @property {IDpUserProj[]} [dpUserProjs] - Список пользователей, связанных с этим достижением (опционально).
 *
 * @example
 * const achievement: IAchievement = {
 *   achievementId: 1,
 *   title: 'Первый вход',
 *   textAchievement: 'Выполните первый вход в систему',
 *   dpUserProjs: [{ dpUserProjId: 1, ... }]
 * };
 */
export interface IAchievement {
    achievementId: number;
    title: string;
    textAchievement?: string;
    dpUserProjs?: IDpUserProj[];
}


