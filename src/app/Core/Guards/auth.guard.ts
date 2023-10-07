import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderComponent } from 'src/app/Shared/layout/header/header.component';
import { AuthNUserService } from '../Services/Auth/auth-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthNUserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let logged: boolean = true;

    this.auth.isLogged.subscribe((isLogged) => {

      if (isLogged) {
        this.auth.OpenModal.next(true);
      } else {
        this.auth.OpenModal.next(false);
      }
      logged = isLogged;
    });

    return logged;
  }
}
