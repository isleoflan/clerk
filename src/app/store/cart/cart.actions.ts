import { createAction, props } from '@ngrx/store';

export const addItem = createAction(
  '[Cart] Add Item',
  props<{productId: string}>()
)

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{productId: string}>()
)

export const increaseQty = createAction(
  '[Cart] Increase Qty',
  props<{productId: string}>()
)

export const decreaseQty = createAction(
  '[Cart] Decrease Qty',
  props<{productId: string}>()
)
