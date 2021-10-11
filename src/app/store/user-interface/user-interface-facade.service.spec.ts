import { TestBed } from '@angular/core/testing';
import {StoreModule} from '@ngrx/store';
import {UserInterfaceStoreReducer} from './index';

import { UserInterfaceFacadeService } from './user-interface-facade.service';

describe('UserInterfaceFacadeService', () => {
  let service: UserInterfaceFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          userInterface: UserInterfaceStoreReducer.reducer
        })
      ],
    });
    service = TestBed.inject(UserInterfaceFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
