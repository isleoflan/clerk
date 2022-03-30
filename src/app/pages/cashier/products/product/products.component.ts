import { Component, OnInit } from '@angular/core';
import {ProductFacadeService} from '@/store/product/product-facade.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['../../../../cashier/products/products.component.scss']
})
export class ProductsComponent implements OnInit {

  productCategories$ = this.productFacadeService.productCategories$;

  constructor(
    private productFacadeService: ProductFacadeService
  ) { }

  ngOnInit(): void {
  }

}
