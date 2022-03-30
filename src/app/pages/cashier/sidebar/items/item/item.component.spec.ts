import { ComponentFixture, TestBed } from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {CartStoreReducer} from '../../../../store/cart';
import {ProductStoreReducer} from '../../../../store/product';

import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemComponent ],
      imports: [
        StoreModule.forRoot({
          product: ProductStoreReducer.reducer,
          cart: CartStoreReducer.reducer
        })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
