import {CartStoreReducer} from './cart';
import {ProductStoreReducer} from './product';

export interface AppState {
  product: ProductStoreReducer.State;
  cart: CartStoreReducer.State;
}
