import { Payload } from '@/interfaces/payload';
import { UserPayload } from '@/interfaces/payload/user-payload';
import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

export const loadUser = createAction(
  '[User] Load User'
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ payload: Payload<UserPayload> }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: HttpErrorResponse }>()
);

export const loadUserCancel = createAction(
  '[User] Load User Cancel'
);
