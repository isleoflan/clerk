import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserInterfaceStoreModule} from '../../store/user-interface/user-interface-store.module';
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
    UserInterfaceStoreModule
  ]
})
export class PayPopupModule { }
