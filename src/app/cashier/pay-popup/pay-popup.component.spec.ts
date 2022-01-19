import { ComponentFixture, TestBed } from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {CartStoreReducer} from '../../store/cart';
import {ProductStoreReducer} from '../../store/product';
import {UserInterfaceStoreReducer} from '../../store/user-interface';

import { PayPopupComponent } from './pay-popup.component';
import {TableItemComponent} from './table-item/table-item.component';

describe('PayPopupComponent', () => {
  let component: PayPopupComponent;
  let fixture: ComponentFixture<PayPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayPopupComponent, TableItemComponent ],
      imports: [
        StoreModule.forRoot({
          userInterface: UserInterfaceStoreReducer.reducer,
          product: ProductStoreReducer.reducer,
          cart: CartStoreReducer.reducer
        })
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
