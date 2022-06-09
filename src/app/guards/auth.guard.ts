import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var logged_in: boolean = sessionStorage.getItem('logged_in') != null;

    var cookies_exist: boolean = true;

    console.log(document.cookie);
    console.log(cookies_exist);
    // console.log(token_exists);
    if (cookies_exist) {
      return true;
    }

    // this.router.navigate(['/login']);
    return true;
    // return true;
  }
}
