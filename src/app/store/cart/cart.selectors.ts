import {createFeatureSelector, createSelector, MemoizedSelector} from '@ngrx/store';
import {SidebarItem} from '../../interfaces/shared/sidebar-item';
import {AppState} from '../app.state';
import {ProductStoreSelectors} from '../product';
import {cartEntityAdapter, cartFeatureKey, State} from './cart.reducer';

export const selectCartState: MemoizedSelector<AppState, State> = createFeatureSelector(cartFeatureKey);

export const {selectAll} = cartEntityAdapter.getSelectors(selectCartState);

export const selectSidebarItems: MemoizedSelector<AppState, SidebarItem[]> = createSelector(
  selectCartState,
  ProductStoreSelectors.selectEntities,
  selectAll,
  (state: State, productEntities, orderProducts) => {
      return orderProducts
        .filter((orderProduct) => typeof productEntities[orderProduct.id] !== 'undefined')
        .map((orderProduct) => {
          return {
            id: orderProduct.id,
            name: productEntities[orderProduct.id]!.name,
            price: productEntities[orderProduct.id]!.price,
            qty: orderProduct.qty
          };
        })
  });

