import {HttpErrorResponse} from '@angular/common/http';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {Product} from '@/interfaces/payload/product';
import {loadProducts, loadProductsCancel, loadProductsFailure, loadProductsSuccess} from './product.actions';


export const productFeatureKey = 'product';

export const productEntityAdapter = createEntityAdapter<Product>();

export interface State extends EntityState<Product>{
  isLoading: boolean;
  hasLoaded: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: State = productEntityAdapter.getInitialState({
  isLoading: false,
  hasLoaded: false,
  error: null
});


export const reducer = createReducer(
  initialState,
  on(loadProducts, (state: State) => {
    return {
      ...state,
      isLoading: true,
      hasLoaded: false,
      error: null
    }
  }),
  on(loadProductsSuccess, (state: State, {payload}) => {
    return productEntityAdapter.addMany(payload.data.products, {
      ...state,
      isLoading: false,
      hasLoaded: true,
      error: null
    })
  }),
  on(loadProductsFailure, (state: State, {error}) => {
    return productEntityAdapter.removeAll({
      ...state,
      isLoading: false,
      hasLoaded: false,
      error
    })
  }),
  on(loadProductsCancel, (state: State) => {
    return {
      ...state,
      isLoading: false,
      error: null
    }
  })
);

