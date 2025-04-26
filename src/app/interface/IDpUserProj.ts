import { IAchievement } from "./IAchievement";

export interface IDpUserProj {
    dpUserProjId: number;
    email?: string;
    password: string;
    login: string;
    achievements?: IAchievement[];
}
