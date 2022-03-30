import { UserPayload } from '@/interfaces/payload/user-payload';
import { AppState } from '@/store/app.state';
import { State, userFeatureKey } from '@/store/user/user.reducer';
import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';

const getUser = (state: State) => state.user;

export const selectUserState: MemoizedSelector<AppState, State> = createFeatureSelector(userFeatureKey);

export const selectUser: MemoizedSelector<AppState, UserPayload | null> = createSelector(
  selectUserState,
  getUser
);
