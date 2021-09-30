import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  title = 'Cola';
  isActive = false;

  constructor() { }

  ngOnInit(): void {
  }

  onMouseDown(): void{
    console.log('here');
    this.isActive = true;
  }

  onMouseUp(): void{
    this.isActive = false;
  }

}
