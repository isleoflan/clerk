import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {reducer, userInterfaceFeatureKey} from './user-interface.reducer';



@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(userInterfaceFeatureKey, reducer)
  ]
})
export class UserInterfaceStoreModule { }
