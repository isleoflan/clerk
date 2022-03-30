import { UserPayload } from '@/interfaces/payload/user-payload';
import { loadUser, loadUserSuccess, loadUserFailure, loadUserCancel } from '@/store/user/user.actions';
import { HttpErrorResponse } from '@angular/common/http';
import { createReducer, on } from '@ngrx/store';

export const userFeatureKey = 'user';

export interface State {
  user: UserPayload | null;
  isLoading: boolean;
  hasLoaded: boolean;
  error: HttpErrorResponse | null;
}

export const initialState: State = {
  user: null,
  isLoading: false,
  hasLoaded: false,
  error: null
};

export const reducer = createReducer(
  initialState,
  on(loadUser, (state) => {
    return {
      ...state,
      user: null,
      isLoading: true,
      hasLoaded: false,
      error: null
    };
  }),
  on(loadUserSuccess, (state, {payload}) => {
    return {
      ...state,
      user: payload.data,
      isLoading: false,
      hasLoaded: true,
      error: null
    };
  }),
  on(loadUserFailure, (state, {error}) => {
    return {
      ...state,
      user: null,
      isLoading: false,
      hasLoaded: false,
      error
    };
  }),
  on(loadUserCancel, (state) => {
    return {
      ...state,
      isLoading: false,
      error: null
    };
  })
);
