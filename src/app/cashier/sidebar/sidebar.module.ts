import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartStoreModule} from '../../store/cart/cart-store.module';
import {ProductStoreModule} from '../../store/product/product-store.module';
import { SidebarComponent } from './sidebar.component';
import { ItemsComponent } from './items/items.component';
import { TotalComponent } from './total/total.component';
import { ItemComponent } from './items/item/item.component';



@NgModule({
  declarations: [
    SidebarComponent,
    ItemsComponent,
    TotalComponent,
    ItemComponent
  ],
  exports: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ProductStoreModule,
    CartStoreModule
  ]
})
export class SidebarModule { }
