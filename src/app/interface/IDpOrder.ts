import { IDpUser } from "./IDpUser";

// DpOrder.ts

export interface IDpOrder {
    dpOrderId: number;
    dpUserId: number;
    dpDateTimeOrder: Date;
    dpTypeOrder?: string;
    dpUser: IDpUser;
}
