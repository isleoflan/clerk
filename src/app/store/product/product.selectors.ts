import {createFeatureSelector, MemoizedSelector} from '@ngrx/store';
import {AppState} from '../app.state';
import {productEntityAdapter, productFeatureKey, State} from './product.reducer';


export const selectProductState: MemoizedSelector<AppState, State> = createFeatureSelector(productFeatureKey);
export const {selectAll} = productEntityAdapter.getSelectors(selectProductState);
