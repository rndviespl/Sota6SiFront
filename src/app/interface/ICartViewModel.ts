import { IDpProduct } from "./IDpProduct";
import { ICartItem } from "./ICartItem";

/**
 * Модель представления корзины.
 *
 * @property {ICartItem[]} cartItems - Список товаров в корзине.
 * @property {IDpProduct[]} products - Список товаров.
 *
 * @example
 * const cart: ICartViewModel = { cartItems: [...], products: [...] };
 */
export interface ICartViewModel {
    cartItems: ICartItem[];
    products: IDpProduct[];
}
