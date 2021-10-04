import { ComponentFixture, TestBed } from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {CartStoreReducer} from '../../store/cart';
import {ProductStoreReducer} from '../../store/product';
import {ItemComponent} from './items/item/item.component';
import {ItemsComponent} from './items/items.component';

import { SidebarComponent } from './sidebar.component';
import {TotalComponent} from './total/total.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        ItemsComponent,
        TotalComponent,
        ItemComponent,
      ],
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
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
