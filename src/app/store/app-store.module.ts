import { AuthStoreModule } from "@/store/auth/auth-store.module";
import { metaReducers } from "@/store/meta-reducers";
import { NgModule } from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';



@NgModule({
  imports: [
    StoreModule.forRoot({}, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25 }) : [],
    EffectsModule.forRoot([]),
    AuthStoreModule
  ]
})
export class AppStoreModule { }
