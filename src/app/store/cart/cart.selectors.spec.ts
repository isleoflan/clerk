import {CartStoreReducer, CartStoreSelectors} from './index';


describe('Cart Selectors', () => {
  it('should select the feature state', () => {
    const result = CartStoreSelectors.selectCartState.projector(CartStoreReducer.initialState);
    expect(result).toEqual(CartStoreReducer.initialState);
    expect(result.ids.length).toEqual(0);
    expect(result.entities).toEqual({});
  });
});
