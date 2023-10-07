import * as UserModel from 'src/app/Core/Models/user.model';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthNUserService } from '../Services/Auth/auth-user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  private isAdmin = false;
  constructor(private auth: AuthNUserService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.auth.UserInfo.subscribe((userData) => {
      this.isAdmin = userData?.role === 'admin';
    });

    if (this.isAdmin) {
      return true;
    }
    this.router.navigateByUrl('/not-found');
    return false;
  }
}
