import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalConnectionComponent } from './terminal-connection.component';

describe('TerminalConnectionComponent', () => {
  let component: TerminalConnectionComponent;
  let fixture: ComponentFixture<TerminalConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
