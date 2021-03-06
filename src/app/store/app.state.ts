import { AuthStoreReducer } from "@/store/auth";
import { UserStoreReducer } from "@/store/user";
import {CartStoreReducer} from './cart';
import {ProductStoreReducer} from './product';
import {UserInterfaceStoreReducer} from './user-interface';

export interface AppState {
  product: ProductStoreReducer.State;
  cart: CartStoreReducer.State;
  userInterface: UserInterfaceStoreReducer.State;
  auth: AuthStoreReducer.State;
  user: UserStoreReducer.State;
}
