import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {UpdateStr} from '@ngrx/entity/src/models';
import {createReducer, on } from '@ngrx/store';
import {OrderProduct} from '../../interfaces/shared/order-product';
import {addItem, decreaseQty, removeItem, increaseQty} from './cart.actions';

const selectId = (orderProduct: OrderProduct): string => orderProduct.productId;

export const cartFeatureKey = 'cart';

export const cartEntityAdapter = createEntityAdapter<OrderProduct>({
  selectId
});

export interface State extends EntityState<OrderProduct>{}

export const initialState: State = cartEntityAdapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(addItem, (state: State, {productId}) => {
    const orderProduct: OrderProduct = {
      productId,
      qty: 0
    };

    if (typeof state.entities[productId] !== 'undefined'){
      orderProduct.qty = state.entities[productId]!.qty;
    }
    orderProduct.qty++;

    return cartEntityAdapter.upsertOne(orderProduct, {
      ...state
    });
  }),

  on(removeItem, (state: State, {productId}) => {
    return cartEntityAdapter.removeOne(productId, {
      ...state
    });
  }),

  on(increaseQty, (state: State, {productId}) => {
    const update: UpdateStr<OrderProduct> = {
      id: productId,
      changes: {
        qty: ++state.entities[productId]!.qty
      },
    }

    return cartEntityAdapter.updateOne(update, {
      ...state
    });
  }),
  on(decreaseQty, (state: State, {productId}) => {
    const update: UpdateStr<OrderProduct> = {
      id: productId,
      changes: {
        qty: --state.entities[productId]!.qty
      },
    }
    return cartEntityAdapter.updateOne(update, {
      ...state
    });
  })
);

