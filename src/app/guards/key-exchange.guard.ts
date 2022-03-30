import { AuthFacadeService } from '@/store/auth/auth-facade.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree, Router } from '@angular/router';
import { Observable, switchMap, of, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyExchangeGuard implements CanActivate {

  constructor(
    private authFacadeService: AuthFacadeService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    // exchange hash to access and refresh token
    return this.authFacadeService.postKeyExchange({
      token: route.paramMap.get('token') || ''
    }).pipe(
      switchMap(() => of(this.router.createUrlTree(['/']))),
      catchError(() => of(false))
    );
  }

}
