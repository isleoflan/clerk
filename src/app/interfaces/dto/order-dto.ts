import {OrderType} from '../enum/order-type';
import {OrderProduct} from '../shared/order-product';

export interface OrderDto {
  type: OrderType;
  badgeId?: number;
  products: OrderProduct[];
}
