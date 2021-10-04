import * as fromCart from './cart.actions';

describe('loadCarts', () => {
  it('should return an action', () => {
    expect(fromCart.addItem.type).toBe('[Cart] Add Item');
    expect(fromCart.removeItem.type).toBe('[Cart] Remove Item');
    expect(fromCart.increaseQty.type).toBe('[Cart] Increase Qty');
    expect(fromCart.decreaseQty.type).toBe('[Cart] Decrease Qty');
  });
});
