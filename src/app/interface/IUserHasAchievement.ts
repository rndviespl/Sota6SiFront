import { IAchievement } from './IAchievement';
import { IDpUserProj } from "./IDpUserProj";


export interface IUserHasAchievement {
  dpUserProjId: number; // Внешний ключ на IDpUserProj
  achievementId: number; // Внешний ключ на IAchievement
  isObtained: boolean; // Флаг, указывающий, получено ли достижение
  dpUserProj?: IDpUserProj; // Навигационное свойство к IDpUserProj
  achievement?: IAchievement; // Навигационное свойство к IAchievement
}
