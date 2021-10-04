import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../interfaces/payload/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  isActive = false;

  @Input() product: Product | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  onMouseDown(): void{
    this.isActive = true;
  }

  onMouseUp(): void{
    this.isActive = false;
  }

}
