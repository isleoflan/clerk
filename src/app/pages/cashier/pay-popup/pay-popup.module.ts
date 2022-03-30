import { PipesModule } from "@/pipes/pipes.module";
import { UserInterfaceStoreModule } from "@/store/user-interface/user-interface-store.module";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PayPopupComponent} from './pay-popup.component';
import { TableItemComponent } from './table-item/table-item.component';



@NgModule({
  declarations: [
    PayPopupComponent,
    TableItemComponent
  ],
  exports: [
    PayPopupComponent
  ],
  imports: [
    CommonModule,
    UserInterfaceStoreModule,
    PipesModule
  ]
})
export class PayPopupModule { }
