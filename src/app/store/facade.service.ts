import { Injectable } from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
  muteFirst<T, R>(first$: Observable<T>, second$: Observable<R>): Observable<R>{
    return combineLatest([first$, second$]).pipe(
      map(([_a, b]) => b),
      distinctUntilChanged()
    );
  }
}
