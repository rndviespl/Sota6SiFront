import { IDpOrder } from "./IDpOrder";

// DpUser.ts

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
