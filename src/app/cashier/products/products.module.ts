import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductStoreModule} from '../../store/product/product-store.module';
import {ProductModule} from './product/product.module';
import { ProductsComponent } from './products.component';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  exports: [
    ProductsComponent
  ],
  imports: [
    CommonModule,
    ProductStoreModule,
    ProductModule
  ]
})
export class ProductsModule { }
