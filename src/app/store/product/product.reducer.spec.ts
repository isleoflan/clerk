import {ProductStoreActions} from './index';
import { reducer, initialState } from './product.reducer';

describe('Product Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });
  describe('load products action', () => {
    it('should return new state with loading true', () => {
      const action = {type: ProductStoreActions.loadProducts.type};
      const result = reducer(initialState, action);

      expect(result.isLoading).toBeTrue();
      expect(result).not.toEqual(initialState);
    });
  })
});
