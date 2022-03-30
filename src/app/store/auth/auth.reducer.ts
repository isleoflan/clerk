import {
  setTokenCollection,
  renewAccessToken,
  initRenewalOfAccessToken,
  renewAccessTokenSuccess,
  renewAccessTokenFailure
} from '@/store/auth/auth.actions';
import { createReducer, on } from '@ngrx/store';


export const authFeatureKey = 'auth';

export interface State {
  accessToken: string | null;
  refreshToken: string | null;
  expiration: Date | null;

  refreshStarted: boolean;
  isRenewing: boolean;
}

export const initialState: State = {
  accessToken: null,
  refreshToken: null,
  expiration: null,

  refreshStarted: false,
  isRenewing: false
};

export const reducer = createReducer(
  initialState,
  on(setTokenCollection, (state: State, {tokenCollection}) => {
    return {
      ...state,
      ...tokenCollection
    };
  }),
  on(initRenewalOfAccessToken, (state: State) => {
    return {
      ...state,
      refreshStarted: true
    };
  }),
  on(renewAccessToken, (state: State) => {
    return {
      ...state,
      isRenewing: true
    };
  }),
  on(renewAccessTokenSuccess, (state: State, {tokenCollection}) => {
    return {
      ...state,
      isRenewing: false,
      accessToken: tokenCollection.accessToken,
      refreshToken: tokenCollection.refreshToken,
      expiration: tokenCollection.expiration
    };
  }),
  on(renewAccessTokenFailure, (state: State) => {
    return {
      ...state,
      isRenewing: false,
      accessToken: null,
      refreshToken: null,
      expiration: null
    };
  })
);
