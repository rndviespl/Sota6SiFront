import { IDpProductAttribute } from "./IDpProductAttribute";
import { IDpCategory } from "./IDpCategory";
import { IDpImage } from "./IDpImage";

// DpProduct.ts

export interface IDpProduct {
    dpProductId: number;
    dpPrice: number;
    dpTitle: string;
    dpDiscountPercent?: number;
    dpDescription?: string;
    dpCategoryId?: number;
    dpPurchasePrice: number;
    dpCategory?: IDpCategory;
    dpImages?: IDpImage[];
    dpProductAttributes?: IDpProductAttribute[];
}
