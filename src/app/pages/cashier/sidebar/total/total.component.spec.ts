import { ComponentFixture, TestBed } from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {CartStoreReducer} from '../../../store/cart';
import {ProductStoreReducer} from '../../../store/product';

import { TotalComponent } from './total.component';

describe('TotalComponent', () => {
  let component: TotalComponent;
  let fixture: ComponentFixture<TotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalComponent ],
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
    fixture = TestBed.createComponent(TotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
