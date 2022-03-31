import { createAction, props } from '@ngrx/store';

export const addItem = createAction(
  '[Cart] Add Item',
  props<{id: string, qty: number}>()
);

export const removeItem = createAction(
  '[Cart] Remove Item',
  props<{id: string}>()
);

export const increaseQty = createAction(
  '[Cart] Increase Qty',
  props<{id: string}>()
);

export const decreaseQty = createAction(
  '[Cart] Decrease Qty',
  props<{id: string}>()
);

export const setQty = createAction(
  '[Cart] Set Qty',
  props<{id: string, qty: number}>()
);

export const reset = createAction(
  '[Cart] Reset'
);

export const setTopUpId = createAction(
  '[Cart] Set Top Up Id',
  props<{id: string}>()
);
