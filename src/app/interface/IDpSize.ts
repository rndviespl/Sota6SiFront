import { IDpCategory } from "./IDpCategory";
import { IDpProductAttribute } from "./IDpProductAttribute";

// DpSize.ts

export interface IDpSize {
    sizeId: number;
    size: string;
    dpProductAttributes?: IDpProductAttribute[];
    dpCategories?: IDpCategory[];
}
