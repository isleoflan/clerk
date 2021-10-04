import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {UpdateStr} from '@ngrx/entity/src/models';
import {createReducer, on } from '@ngrx/store';
import {OrderProduct} from '../../interfaces/shared/order-product';
import {addItem, decreaseQty, removeItem, increaseQty} from './cart.actions';


export const cartFeatureKey = 'cart';

export const cartEntityAdapter = createEntityAdapter<OrderProduct>();

export interface State extends EntityState<OrderProduct>{}

export const initialState: State = cartEntityAdapter.getInitialState();


export const reducer = createReducer(
  initialState,
  on(addItem, (state: State, {id}) => {
    const orderProduct: OrderProduct = {
      id: id,
      qty: 0
    };

    if (typeof state.entities[id] !== 'undefined'){
      orderProduct.qty = state.entities[id]!.qty;
    }
    orderProduct.qty++;

    return cartEntityAdapter.upsertOne(orderProduct, {
      ...state
    });
  }),

  on(removeItem, (state: State, {id}) => {
    return cartEntityAdapter.removeOne(id, {
      ...state
    });
  }),

  on(increaseQty, (state: State, {id}) => {
    const update: UpdateStr<OrderProduct> = {
      id,
      changes: {
        qty: state.entities[id]!.qty + 1
      },
    }

    return cartEntityAdapter.updateOne(update, {
      ...state
    });
  }),
  on(decreaseQty, (state: State, {id}) => {
    const update: UpdateStr<OrderProduct> = {
      id,
      changes: {
        qty: state.entities[id]!.qty -1
      },
    }
    return cartEntityAdapter.updateOne(update, {
      ...state
    });
  })
);

