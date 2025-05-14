import { IDpUserProj } from "./IDpUserProj";

// Achievement.ts
export interface IAchievement {
    achievementId: number;
    title: string;
    textAchievement?: string;
    dpUserProjs?: IDpUserProj[];
}


