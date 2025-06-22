import { IAchievement } from './IAchievement';
import { IDpUserProj } from "./IDpUserProj";

/**
 * Интерфейс связи пользователя проекта с достижением (UserHasAchievement).
 *
 * @property {number} dpUserProjId - Внешний ключ на пользователя проекта (IDpUserProj).
 * @property {number} achievementId - Внешний ключ на достижение (IAchievement).
 * @property {boolean} isObtained - Флаг, указывающий, получено ли достижение.
 * @property {IDpUserProj} [dpUserProj] - Навигационное свойство к пользователю проекта (опционально).
 * @property {IAchievement} [achievement] - Навигационное свойство к достижению (опционально).
 *
 * @example
 * const userAchievement: IUserHasAchievement = {
 *   dpUserProjId: 1,
 *   achievementId: 2,
 *   isObtained: true,
 *   dpUserProj: { dpUserProjId: 1, login: 'vasya', password: '123', ... },
 *   achievement: { achievementId: 2, title: 'Первый вход', ... }
 * };
 */
export interface IUserHasAchievement {
  dpUserProjId: number; // Внешний ключ на IDpUserProj
  achievementId: number; // Внешний ключ на IAchievement
  isObtained: boolean; // Флаг, указывающий, получено ли достижение
  dpUserProj?: IDpUserProj; // Навигационное свойство к IDpUserProj
  achievement?: IAchievement; // Навигационное свойство к IAchievement
}
