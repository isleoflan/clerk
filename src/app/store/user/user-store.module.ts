import { userFeatureKey, reducer } from '@/store/user/user.reducer';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [],
  imports: [
    StoreModule.forFeature(userFeatureKey, reducer)
  ]
})
export class UserStoreModule {
}
