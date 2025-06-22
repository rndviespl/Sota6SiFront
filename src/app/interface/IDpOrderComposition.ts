import { IDpProductAttribute } from "./IDpProductAttribute";
import { IDpOrder } from "./IDpOrder";

/**
 * Интерфейс для состава заказа (Order Composition).
 *
 * @property {number} dpOrderId - Идентификатор заказа.
 * @property {number} dpAttributesId - Идентификатор атрибута товара.
 * @property {number} dpQuantity - Количество товара в заказе.
 * @property {number} dpCost - Стоимость одной единицы товара.
 * @property {IDpProductAttribute} dpAttributes - Объект атрибута товара.
 * @property {IDpOrder} dpOrder - Объект заказа.
 *
 * @example
 * const orderComp: IDpOrderComposition = {
 *   dpOrderId: 1,
 *   dpAttributesId: 2,
 *   dpQuantity: 3,
 *   dpCost: 1500,
 *   dpAttributes: { dpAttributesId: 2, dpProductId: 1, ... },
 *   dpOrder: { dpOrderId: 1, dpUserId: 2, ... }
 * };
 */
export interface IDpOrderComposition {
    dpOrderId: number;
    dpAttributesId: number;
    dpQuantity: number;
    dpCost: number;
    dpAttributes: IDpProductAttribute;
    dpOrder: IDpOrder;
}
