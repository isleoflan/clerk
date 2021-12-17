import { TestBed } from '@angular/core/testing';

import { WebUsbService } from './web-usb.service';

describe('WebUsbService', () => {
  let service: WebUsbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebUsbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
