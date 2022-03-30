import { CartFacadeService } from "@/store/cart/cart-facade.service";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  cart$ = this.cartFacadeService.cart$;

  constructor(
    private cartFacadeService: CartFacadeService
  ) { }

  ngOnInit(): void {
  }

}
