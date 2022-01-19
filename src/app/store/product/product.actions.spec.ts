import * as fromProduct from './product.actions';

describe('loadProducts', () => {
  it('should return an action', () => {
    expect(fromProduct.loadProducts.type).toBe('[Product] Load Products');
    expect(fromProduct.loadProductsSuccess.type).toBe('[Product] Load Products Success');
    expect(fromProduct.loadProductsFailure.type).toBe('[Product] Load Products Failure');
    expect(fromProduct.loadProductsCancel.type).toBe('[Product] Load Products Cancel');
  });
});
