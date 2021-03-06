import { PipesModule } from "@/pipes/pipes.module";
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import {UserInterfaceStoreModule} from '@/store/user-interface/user-interface-store.module';

import { CashierRoutingModule } from './cashier-routing.module';
import {CashierComponent} from './cashier.component';
import {PayPopupModule} from './pay-popup/pay-popup.module';
import {ProductsModule} from './products/products.module';
import {SidebarModule} from './sidebar/sidebar.module';


@NgModule({
  declarations: [
    CashierComponent,
  ],
  imports: [
    CommonModule,
    CashierRoutingModule,
    ProductsModule,
    SidebarModule,
    PayPopupModule,
    UserInterfaceStoreModule,
    PipesModule,
  ],
  providers: [CurrencyPipe],
})
export class CashierModule { }
