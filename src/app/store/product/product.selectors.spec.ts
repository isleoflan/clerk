import {AppState} from '../app.state';
import {ProductStoreReducer, ProductStoreSelectors} from './index';

const initialState: AppState = {
  product: ProductStoreReducer.initialState
}

describe('Product Selectors', () => {

  it('should select the feature state', () => {
    const result = ProductStoreSelectors.selectProductState.projector(initialState.product);
    expect(result).toEqual(initialState.product);

    expect(result.isLoading).toBeFalse();
    expect(result.hasLoaded).toBeFalse();
    expect(result.error).toBeFalsy();

    expect(result.ids.length).toEqual(0);
    expect(result.entities).toEqual({});
  });
});
