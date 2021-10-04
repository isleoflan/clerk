import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../app.state';
import {CartStoreSelectors} from './index';

@Injectable({
  providedIn: 'root'
})
export class CartFacadeService {

  cart$ = this.store.select(CartStoreSelectors.selectAll);

  constructor(
    private store: Store<AppState>
  ) { }
}
