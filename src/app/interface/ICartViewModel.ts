import { IDpProduct } from "./IDpProduct";
import { ICartItem } from "./ICartItem";

// CartViewModel.ts

export interface ICartViewModel {
    cartItems: ICartItem[];
    products: IDpProduct[];
}
