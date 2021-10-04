import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {cartEntityAdapter, cartFeatureKey, State} from './cart.reducer';

export const selectCartState: MemoizedSelector<AppState, State> = createFeatureSelector(cartFeatureKey);

export const {selectAll} = cartEntityAdapter.getSelectors(selectCartState);

