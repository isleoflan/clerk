import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    CommonModule
  ]
})
export class SidebarModule { }
