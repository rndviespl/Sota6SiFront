import { IDpSize } from "./IDpSize";
import { IDpProduct } from "./IDpProduct";

// DpCategory.ts

export interface IDpCategory {
    dpCategoryId: number;
    dpCategoryTitle: string;
    sizeId: number;
    size: IDpSize;
    dpProducts?: IDpProduct[];
}
