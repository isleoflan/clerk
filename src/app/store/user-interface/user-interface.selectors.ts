import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {State, userInterfaceFeatureKey} from './user-interface.reducer';

const getIsPaymentPopupVisible = (state: State) => state.isPaymentPopupVisible

export const selectUserInterfaceState: MemoizedSelector<AppState, State> = createFeatureSelector(userInterfaceFeatureKey);

export const selectIsPaymentPopupVisible: MemoizedSelector<AppState, boolean> = createSelector(
  selectUserInterfaceState,
  getIsPaymentPopupVisible
)
