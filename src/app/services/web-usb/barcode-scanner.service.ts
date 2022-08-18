import { Injectable, RendererFactory2, Renderer2 } from '@angular/core';
import { Event } from "@angular/router";
import {
  fromEventPattern,
  Observable,
  switchMap,
  bufferTime,
  map,
  of,
  Subject,
  tap,
  bufferToggle,
  EMPTY,
  bufferWhen
} from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {
  private events$ = new Observable<KeyboardEvent>();

  messages$ = new Observable<string>();

  constructor(
    private rendererFactory2: RendererFactory2
  ) {
    const renderer = this.rendererFactory2.createRenderer(null, null);
    this.listener(renderer);
  }

  private listener(renderer: Renderer2){
    const createKeyPressEventListener = (handler: (e: KeyboardEvent) => boolean | void) => {
      renderer.listen("document", "keypress", handler)
    };
    this.events$ = fromEventPattern<KeyboardEvent>(createKeyPressEventListener);

    this.messages$ = this.events$.pipe(
      bufferWhen(() => this.events$.pipe(filter((event) => event.key === 'Enter'))),
      map((events) => {
        const lastEvents = events.filter((event) => event.key !== 'Enter').slice(-25);
        return lastEvents.map((event: KeyboardEvent) => event.key).join('');
      }),
    );
  }
}
