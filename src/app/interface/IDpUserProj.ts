import { IAchievement } from "./iachievement";

export interface IDpUserProj {
    dpUserProjId: number;
    email?: string;
    password: string;
    login: string;
    achievements?: IAchievement[];
}
