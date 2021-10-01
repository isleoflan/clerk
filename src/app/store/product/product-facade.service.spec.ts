import { TestBed } from '@angular/core/testing';

import { ProductFacadeService } from './product-facade.service';

describe('ProductFacadeService', () => {
  let service: ProductFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
