import * as fromUserInterface from './user-interface.actions';

describe('loadUserInterfaces', () => {
  it('should return an action', () => {
    expect(fromUserInterface.showPaymentPopup.type).toBe('[UserInterface] Show Payment Popup');
    expect(fromUserInterface.hidePaymentPopup.type).toBe('[UserInterface] Hide Payment Popup');
  });
});
