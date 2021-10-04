import {reducer, initialState, State} from './cart.reducer';
import {CartStoreActions} from './index';

describe('Cart Reducer', () => {
  const id = 'ASD123F';
  let state: State;

  beforeEach(() => {
    const action = {type: CartStoreActions.addItem.type, id };
    state = reducer(initialState, action);
  });

  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
  describe('add item to cart', () => {
    it('should return cart with added item', () => {
      expect(state.ids.length).toEqual(1);
      expect(state.ids[0]).toEqual(id);
      expect(state.entities[id]?.qty).toEqual(1);
    });
    it('should should increase qty on double add', () => {
      const action = {type: CartStoreActions.addItem.type, id };
      state = reducer(state, action);

      expect(state.ids.length).toEqual(1);
      expect(state.ids[0]).toEqual(id);
      expect(state.entities[id]?.qty).toEqual(2);
    });
  });
  describe('remove item from cart', () => {
    it('should return empty cart', () => {
      // remove Product
      const removeAction = {type: CartStoreActions.removeItem.type, id}
      state = reducer(state, removeAction);

      expect(state.ids.length).toEqual(0);
      expect(state.entities).toEqual({});
    });
  });
  describe('manipulate qty', () => {
    it('should increase qty', () => {
      const increaseAction = {type: CartStoreActions.increaseQty.type, id }
      const result = reducer(state, increaseAction);

      expect(result.entities[id]?.qty).toEqual(2);
    });
    it('should decrease qty', () => {
      const decreaseAction = {type: CartStoreActions.decreaseQty.type, id }
      const result = reducer(state, decreaseAction);

      expect(result.entities[id]?.qty).toEqual(0);
    });
  })
});
