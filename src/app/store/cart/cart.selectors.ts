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
        .filter((orderProduct) => orderProduct.qty > 0)
        .map((orderProduct) => {
          return {
            id: orderProduct.id,
            name: productEntities[orderProduct.id]!.name,
            price: productEntities[orderProduct.id]!.price,
            qty: orderProduct.qty,
          };
        })
  });

export const selectTotal: MemoizedSelector<AppState, number> = createSelector(
  selectCartState,
  selectSidebarItems,
  (state: State, sidebarItems: SidebarItem[]) => {
    let total = 0;
    sidebarItems.forEach((sidebarItem) => {
      total += sidebarItem.qty * sidebarItem.price;
    });
    return total;
  }
);

