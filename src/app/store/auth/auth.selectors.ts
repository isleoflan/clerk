import { AppState } from '@/store/app.state';
import { State, authFeatureKey } from '@/store/auth/auth.reducer';
import { MemoizedSelector, createFeatureSelector, createSelector } from '@ngrx/store';

const getAccessToken = (state: State): string | null => state.accessToken;

export const selectAuthState: MemoizedSelector<AppState, State> = createFeatureSelector(authFeatureKey);

export const selectAccessToken: MemoizedSelector<AppState, string | null> = createSelector(
  selectAuthState,
  getAccessToken
);
