import {HttpErrorResponse} from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import {Payload} from '@/interfaces/payload';
import {Product} from '@/interfaces/payload/product';

export const loadProducts = createAction(
  '[Product] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ payload: Payload<{products: Product[], topUpId: string}> }>()
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadProductsCancel = createAction(
  '[Product] Load Products Cancel'
)
