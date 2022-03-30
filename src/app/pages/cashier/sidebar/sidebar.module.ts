import { PipesModule } from "@/pipes/pipes.module";
import { CartStoreModule } from "@/store/cart/cart-store.module";
import { ProductStoreModule } from "@/store/product/product-store.module";
import { UserInterfaceStoreModule } from "@/store/user-interface/user-interface-store.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { ItemsComponent } from './items/items.component';
import { TotalComponent } from './total/total.component';
import { ItemComponent } from './items/item/item.component';
import { TerminalConnectionComponent } from './terminal-connection/terminal-connection.component';



@NgModule({
  declarations: [
    SidebarComponent,
    ItemsComponent,
    TotalComponent,
    ItemComponent,
    TerminalConnectionComponent
  ],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ProductStoreModule,
    CartStoreModule,
    UserInterfaceStoreModule,
    PipesModule
  ]
})
export class SidebarModule { }
