import {OrderProduct} from '../shared/order-product';

export interface OrderDto {
  badgeId: string;
  products: OrderProduct[];
}
