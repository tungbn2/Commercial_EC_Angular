import * as UserModel from 'src/app/Core/Models/user.model';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { AuthNUserService } from './auth-user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private auth: AuthNUserService, private toastr: ToastrService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //check token
    const tokens = localStorage.getItem('token')
      ? (JSON.parse(localStorage.getItem('token') || '') as UserModel.Tokens)
      : null;

    // check token null
    if (!tokens || this.isRefreshing) {
      return next.handle(request);
    }

    // check access token expire
    if (new Date() >= new Date(tokens.access.expires)) {

      this.isRefreshing = true;

      this.auth.GetRefreshTokens().subscribe(
        (token) => {
          this.isRefreshing = false;
          return next.handle(this.addTokenHeader(request, token));
        },
        (error) => {
          this.toastr.error(error?.error?.message);
        }
      );
    }

    // access token can use

    let accessToken = tokens.access.token;
    let authReq = this.addTokenHeader(request, accessToken);

    return next.handle(authReq).pipe(
      catchError((error) => {
        // if (error.status == 401) {
        //   localStorage.removeItem('token');
        //   return of();
        // }

        this.toastr.error(error?.error?.message);
        return throwError(error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set('Authorization', `bearer ${token}`),
    });
  }
}
