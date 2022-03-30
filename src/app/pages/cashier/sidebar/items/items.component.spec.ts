import { ComponentFixture, TestBed } from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {CartStoreReducer} from '../../../store/cart';
import {ProductStoreReducer} from '../../../store/product';
import {ItemComponent} from './item/item.component';

import { ItemsComponent } from './items.component';

describe('ItemsComponent', () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemsComponent, ItemComponent ],
      imports: [
        StoreModule.forRoot({
          product: ProductStoreReducer.reducer,
          cart: CartStoreReducer.reducer
        })
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
