import { Product } from "@/interfaces/payload/product";
import { CartFacadeService } from "@/store/cart/cart-facade.service";
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isActive = false;

  @Input() product: Product | null = null;

  constructor(
    private cartFacadeService: CartFacadeService,
  ) { }

  ngOnInit(): void {
  }

  onMouseDown(): void{
    this.isActive = true;
  }

  onMouseUp(): void{
    this.isActive = false;
  }
  onClick(id: string): void{
    this.cartFacadeService.addProductToCart(id);
  }
}
