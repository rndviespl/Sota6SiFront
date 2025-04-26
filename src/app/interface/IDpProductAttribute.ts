import { IDpSize } from "./IDpSize";
import { IDpProduct } from "./IDpProduct";

// DpProductAttribute.ts

export interface IDpProductAttribute {
    dpAttributesId: number;
    dpProductId: number;
    dpCount: number;
    dpSize?: number;
    dpProduct: IDpProduct;
    dpSizeNavigation?: IDpSize;
}
