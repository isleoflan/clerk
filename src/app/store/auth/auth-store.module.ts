import { authFeatureKey, reducer } from '@/store/auth/auth.reducer';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthEffects } from './auth.effects';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(authFeatureKey, reducer),
    EffectsModule.forFeature([AuthEffects])
  ]
})
export class AuthStoreModule {
}
