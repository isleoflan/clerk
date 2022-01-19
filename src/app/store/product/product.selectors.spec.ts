import {ProductStoreReducer, ProductStoreSelectors} from './index';


describe('Product Selectors', () => {

  it('should select the feature state', () => {
    const result = ProductStoreSelectors.selectProductState.projector(ProductStoreReducer.initialState);
    expect(result).toEqual(ProductStoreReducer.initialState);

    expect(result.isLoading).toBeFalse();
    expect(result.hasLoaded).toBeFalse();
    expect(result.error).toBeFalsy();

    expect(result.ids.length).toEqual(0);
    expect(result.entities).toEqual({});
  });
});
