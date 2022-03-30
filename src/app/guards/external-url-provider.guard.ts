import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ExternalUrlProviderGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const externalUrl = route.paramMap.get('externalUrl');
    if (externalUrl) {
      window.open(externalUrl, '_self');
      return true;
    }
    return this.router.createUrlTree(['/']);
  }
}
