import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {productFeatureKey, reducer} from './product.reducer';



@NgModule({
  imports: [
    StoreModule.forFeature(productFeatureKey, reducer)
  ]
})
export class ProductStoreModule { }
