import * as fromAuth from './auth.actions';

describe('loadAuths', () => {
  it('should return an action', () => {
    expect(fromAuth.setIolAccessToken.type).toBe('[Auth] Load Auths');
  });
});
