import { ProductFacadeService } from "@/store/product/product-facade.service";
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productCategories$ = this.productFacadeService.productCategories$;

  constructor(
    private productFacadeService: ProductFacadeService
  ) { }

  ngOnInit(): void {
  }

}
