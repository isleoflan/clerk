import { createAction, props } from '@ngrx/store';

export const addItem = createAction(
  '[Cart] Add Item',
  props<{id: string}>()
)

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{id: string}>()
)

export const increaseQty = createAction(
  '[Cart] Increase Qty',
  props<{id: string}>()
)

export const decreaseQty = createAction(
  '[Cart] Decrease Qty',
  props<{id: string}>()
)
