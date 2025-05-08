// UpdateCartRequest.ts

export interface IUpdateCartRequest {
    productId: number;
    quantity: number;
    sizeId?: number;
}
