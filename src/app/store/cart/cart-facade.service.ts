import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {CartStoreActions, CartStoreSelectors} from './index';

@Injectable({
  providedIn: 'root'
})
export class CartFacadeService {

  orderProducts$ = this.store.select(CartStoreSelectors.selectAll);
  cart$ = this.store.select(CartStoreSelectors.selectSidebarItems);
  total$ = this.store.select(CartStoreSelectors.selectTotal);

  topUp$ = this.store.select(CartStoreSelectors.selectTopUp);
  topUpId$ = this.store.select(CartStoreSelectors.selectTopUpId);

  constructor(
    private store: Store<AppState>
  ) { }

  addProductToCart(id: string, qty: number = 0): void{
    this.store.dispatch({type: CartStoreActions.addItem.type, id, qty});
  }

  removeProductFromCart(id: string): void{
    this.store.dispatch({type: CartStoreActions.removeItem.type, id});
  }

  increaseQty(id: string): void{
    this.store.dispatch({type: CartStoreActions.increaseQty.type, id});
  }

  decreaseQty(id: string): void{
    this.store.dispatch({type: CartStoreActions.decreaseQty.type, id});
  }

  setQty(id: string, qty: number): void {
    this.store.dispatch({type: CartStoreActions.setQty.type, id, qty});
  }

  reset(): void {
    this.store.dispatch({type: CartStoreActions.reset.type});
  }

  setTopUpId(id: string): void {
    this.store.dispatch({type: CartStoreActions.setTopUpId.type, id});
  }
}
