import { ActionReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppState } from '../app.state';

export const hydrationMetaReducer = (reducer: ActionReducer<AppState>): ActionReducer<AppState> => {
  return localStorageSync({
    keys: [
      {
        'auth': ['accessToken', 'refreshToken', 'expiration']
      }
    ],
    rehydrate: true
  })(reducer);
};
