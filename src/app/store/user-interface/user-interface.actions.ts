import { createAction } from '@ngrx/store';

export const showPaymentPopup = createAction(
  '[UserInterface] Show Payment Popup'
);
export const hidePaymentPopup = createAction(
  '[UserInterface] Hide Payment Popup'
)

