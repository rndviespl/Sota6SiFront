import { IDpProductAttribute } from "./IDpProductAttribute";
import { IDpOrder } from "./IDpOrder";

// DpOrderComposition.ts

export interface IDpOrderComposition {
    dpOrderId: number;
    dpAttributesId: number;
    dpQuantity: number;
    dpCost: number;
    dpAttributes: IDpProductAttribute;
    dpOrder: IDpOrder;
}
