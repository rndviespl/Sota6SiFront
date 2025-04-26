import { IDpProduct } from "./IDpProduct";

// DpImage.ts

export interface IDpImage {
    dpImagesId: number;
    dpProductId: number;
    dpImageTitle: string;
    imagesData?: Uint8Array;
    dpProduct: IDpProduct;
}
