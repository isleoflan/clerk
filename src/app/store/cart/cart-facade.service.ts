import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {CartStoreActions, CartStoreSelectors} from './index';

@Injectable({
  providedIn: 'root'
})
export class CartFacadeService {

  cart$ = this.store.select(CartStoreSelectors.selectSidebarItems);
  total$ = this.store.select(CartStoreSelectors.selectTotal);

  constructor(
    private store: Store<AppState>
  ) { }

  addProductToCart(id: string): void{
    this.store.dispatch({type: CartStoreActions.addItem.type, id});
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
}
