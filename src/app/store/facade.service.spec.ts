import { TestBed } from '@angular/core/testing';
import {of} from 'rxjs';
import {TestScheduler} from 'rxjs/testing';

import { FacadeService } from './facade.service';

describe('FacadeService', () => {
  let service: FacadeService;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacadeService);
    scheduler = new TestScheduler(((actual, expected) => {
      expect(actual).toEqual(expected);
    }))
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should only return second observable', () => {
    scheduler.run(({expectObservable}) => {
      const expectMarble = '(abcde|)';
      const expectedOutput = {a: '🍕', b: '🍅', c: '🧀', d: '🌶', e: '🍄'};
      const first$ = of('💵');
      const second$ = of('🍕', '🍅', '🧀', '🌶', '🍄');
      expectObservable(service.muteFirst(first$, second$)).toBe(expectMarble, expectedOutput);
    });
  });
  it('should not emit the same value twice', () => {
    scheduler.run(({expectObservable}) => {
      const expectMarble = '(abcde|)';
      const expectedOutput = {a: '🍕', b: '🍅', c: '🧀', d: '🌶', e: '🍄'};
      const first$ = of('💵');
      const second$ = of('🍕', '🍕', '🍅', '🧀', '🧀', '🌶', '🌶', '🌶', '🍄');
      expectObservable(service.muteFirst(first$, second$)).toBe(expectMarble, expectedOutput);
    });
  });
  it('should not emmit a value if the first observable never emits a value', () => {
    scheduler.run(({expectObservable}) => {
      const expectMarble = '|';
      const expectedOutput = {};
      const first$ = of();
      const second$ = of('🍕', '🍕', '🍅', '🧀', '🧀', '🌶', '🌶', '🌶', '🍄');
      expectObservable(service.muteFirst(first$, second$)).toBe(expectMarble, expectedOutput);
    });
  });
});
