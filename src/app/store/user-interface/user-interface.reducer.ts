import { createReducer, on } from '@ngrx/store';
import {hidePaymentPopup, showPaymentPopup} from './user-interface.actions';


export const userInterfaceFeatureKey = 'userInterface';

export interface State {
  isPaymentPopupVisible: boolean;
}

export const initialState: State = {
  isPaymentPopupVisible: false
};


export const reducer = createReducer(
  initialState,
  on(showPaymentPopup, (state: State) => {
    return {
      ...state,
      isPaymentPopupVisible: true
    }
  }),
  on(hidePaymentPopup, (state: State) => {
    return {
      ...state,
      isPaymentPopupVisible: false
    }
  })
);

