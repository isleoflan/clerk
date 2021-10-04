import {Product} from '../payload/product';
import {OrderProduct} from './order-product';

export interface SidebarItem extends Product, OrderProduct{
}
