import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AbstractCashierApiService} from './api/cashier/abstract-cashier-api.service';
import {MockCashierApiService} from './api/cashier/mock-cashier-api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppStoreModule} from './store/app-store.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppStoreModule
  ],
  providers: [
    { provide: AbstractCashierApiService, useClass: MockCashierApiService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
