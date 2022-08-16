import { Injectable, RendererFactory2, Renderer2 } from '@angular/core';
import { Event } from "@angular/router";
import { fromEventPattern, Observable, switchMap, bufferTime, map, of, Subject, tap } from "rxjs";
import { filter } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BarcodeScannerService {
  private events$ = new Observable<KeyboardEvent>();
  messages$ = new Observable<String>();

  constructor(
    private rendererFactory2: RendererFactory2
  ) {
    const renderer = this.rendererFactory2.createRenderer(null, null);

    this.listener(renderer);
    this.events$.subscribe();
  }

  private listener(renderer: Renderer2){
    const createKeyPressEventListener = (handler: (e: KeyboardEvent) => boolean | void) => {
      renderer.listen("document", "keypress", handler)
    };

    this.events$ = fromEventPattern<KeyboardEvent>(createKeyPressEventListener).pipe(
      tap((event) => console.log(event.key))
    );
  }
}
