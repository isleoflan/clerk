import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {cartFeatureKey, reducer} from './cart.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CartEffects } from './cart.effects';



@NgModule({
  imports: [
    StoreModule.forFeature(cartFeatureKey, reducer),
    EffectsModule.forFeature([CartEffects]),
  ]
})
export class CartStoreModule { }
