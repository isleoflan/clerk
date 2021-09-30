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
    CommonModule
  ]
})
export class PayPopupModule { }
