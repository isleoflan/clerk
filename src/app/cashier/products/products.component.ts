import { Component, OnInit } from '@angular/core';
import {ProductFacadeService} from '../../store/product/product-facade.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products$ = this.productFacadeService.products$;

  constructor(
    private productFacadeService: ProductFacadeService
  ) { }

  ngOnInit(): void {
  }

}
