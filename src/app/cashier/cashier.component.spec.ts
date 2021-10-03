import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierComponent } from './cashier.component';
import {PayPopupModule} from './pay-popup/pay-popup.module';
import {ProductsModule} from './products/products.module';
import {SidebarModule} from './sidebar/sidebar.module';

describe('CashierComponent', () => {
  let component: CashierComponent;
  let fixture: ComponentFixture<CashierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CashierComponent
      ],
      imports: [
        ProductsModule,
        SidebarModule,
        PayPopupModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
