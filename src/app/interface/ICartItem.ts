// CartItem.ts

export interface ICartItem {
    productId: number;
    productTitle: string;
    price: number;
    quantity: number;
    sizeId?: number; // Add sizeId property
}
