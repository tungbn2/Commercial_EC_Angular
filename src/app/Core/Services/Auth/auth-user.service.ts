import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  map,
  Subject,
  tap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';

import * as UserModel from 'src/app/Core/Models/user.model';
import { API_URL } from '../../Constants/endpoint.conts';
import { ProductService } from '../Product/product.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthNUserService {
  private DEVIE_ID = this.createDeviceId();
  UserInfo = new BehaviorSubject<UserModel.UserInfo | null>(null);
  isLogged = new BehaviorSubject<boolean>(true);

  OpenModal = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  // Register function
  Register(userRegis: UserModel.UserRegis) {
    this.http.post(API_URL + '/auth/register', userRegis).subscribe(
      (data: any) => {
        let user: UserModel.UserLogin = {
          email: userRegis.email,
          password: userRegis.password,
        };

        this.Login(user);
      },
      (error) => {
        this.toastr.error(error?.error?.message);
      }
    );
  }

  // login function
  Login(user: UserModel.UserLogin) {
    const userSignIn = { ...user, deviceId: this.DEVIE_ID };

    this.http.post<any>(API_URL + '/auth/login', userSignIn).subscribe(
      (data) => {
        let user = data.data.user as UserModel.UserInfo;
        this.productService.CheckOrder(user);

        this.UserInfo.next(user);

        localStorage.setItem('devideId', data.data.deviceId as string);
        let token = JSON.stringify(data.data.tokens as UserModel.Tokens);
        localStorage.setItem('token', token);

        this.isLogged.next(true);
        if (user.role === 'admin') {
          this.router.navigateByUrl('/admin');
        }

        this.toastr.success('Login Success!');
      },
      (error) => {
        this.toastr.error(error?.error?.message);
        this.isLogged.next(false);
      }
    );
  }

  // autologin
  CheckLogin() {
    this.isLogged.next(true);

    let tokens = localStorage.getItem('token')
      ? (JSON.parse(localStorage.getItem('token') || '') as UserModel.Tokens)
      : null;

    if (
      tokens &&
      new Date().getDate() < new Date(tokens.access.expires).getDate() + 1
    ) {
      this.GetRefreshTokens().subscribe(
        (token) => {
          this.GetMyProfile();
        },
        (error) => {
          this.toastr.error(error?.error?.message);
        }
      );
    } else {
      localStorage.removeItem('token');
      this.isLogged.next(false);
      this.router.navigateByUrl('/');
    }
  }

  // Logout
  Logout() {
    let refreshToken = (
      JSON.parse(localStorage.getItem('token') || '') as UserModel.Tokens
    ).refresh.token;

    let LogoutInfo = {
      refreshToken,
      deviceId: this.DEVIE_ID,
    };

    this.http.post<any>(API_URL + '/auth/logout', LogoutInfo).subscribe(
      (data) => {
        this.UserInfo.next(null);
        localStorage.removeItem('token');
        this.productService.CartDetail.next(null);
        this.isLogged.next(false);
        this.toastr.success('Logout Success!');

        this.router.navigateByUrl('/');
      },
      (error) => {
        this.toastr.error(error?.error?.message);
      }
    );
  }

  // refresh-tokens
  GetRefreshTokens() {
    let refreshToken = (
      JSON.parse(localStorage.getItem('token') || '') as UserModel.Tokens
    ).refresh.token;

    let refreshData = {
      deviceId: this.DEVIE_ID,
      refreshToken,
    };

    return this.http
      .post<any>(API_URL + '/auth/refresh-tokens', refreshData)
      .pipe(
        map((data) => {
          let token = JSON.stringify(data.data as UserModel.Tokens);
          localStorage.setItem('token', token);
          return data.data.access.token;
        }),
        catchError((error) => {
          if (error.status == 401) {
            localStorage.removeItem('token');
            this.isLogged.next(false);
          }

          return throwError(error);
        })
      );
  }

  // forgot-password
  ForgotPassword(email: string) {
    return this.http.post(API_URL + '/auth/forgot-password', { email });
  }

  // send-verify-email
  SendVerifyEmail() {
    this.http
      .post<any>(API_URL + 'auth/send-verification-email', {
        deviceId: this.DEVIE_ID,
      })
      .subscribe(
        (data) =>
          this.toastr.success(
            'Send Verify Email Success! Please check your email!'
          ),
        (error) => {
          this.toastr.error(error?.error?.message);
        }
      );
  }

  // verify-email
  VerifyEmail() {
    let token = (
      JSON.parse(localStorage.getItem('token') || '') as UserModel.Tokens
    ).access.token;

    this.http
      .post<any>(API_URL + `/auth/verify-email?token=${token}`, {
        deviceId: this.DEVIE_ID,
      })
      .subscribe(
        (data) =>
          this.toastr.success(
            'Send Verify Email Success! Please check your email!'
          ),
        (error) => {
          this.toastr.error(error?.error?.message);
        }
      );
  }

  // myProfile
  GetMyProfile() {
    this.http.get<any>(API_URL + '/users/my-profile').subscribe(
      (data) => {
        let userInfo = data.data as UserModel.UserInfo;
        this.productService.CheckOrder(userInfo);

        this.UserInfo.next(userInfo);
        if (userInfo.role === 'admin') {
          this.router.navigateByUrl('/admin');
        }

        this.toastr.success('Login Success!');
      },
      (error) => {
        this.toastr.error(error?.error?.message);
      }
    );
  }

  // change-contact
  ChangeContact(contact: string) {
    this.http
      .patch<any>(API_URL + '/users/change-contact', { contact })
      .subscribe(
        (res) => {
          let userData: UserModel.UserInfo = res.data;

          this.UserInfo.next(userData);
          this.toastr.success('Change Contact Success!');
        },
        (error) => {
          this.toastr.error(error?.error?.message);
        }
      );
  }

  // change-email
  ChangeEmail(email: string) {
    this.http.patch<any>(API_URL + '/users/change-email', { email }).subscribe(
      (res) => {
        let userData: UserModel.UserInfo = res.data;

        this.UserInfo.next(userData);
        this.toastr.success('Change Email Success!');
      },
      (error) => {
        this.toastr.error(error?.error?.message);
      }
    );
  }

  // change-password
  ChangePassword(password: string) {
    this.http
      .patch<any>(API_URL + '/users/change-password', {
        password,
      })
      .subscribe(
        (res) => {
          let userData: UserModel.UserInfo = res.data;

          this.UserInfo.next(userData);
        },
        (error) => {
          this.toastr.error(error?.error?.message);
        }
      );
  }

  // change-username
  ChangeUsername(username: string) {
    this.http
      .patch<any>(API_URL + '/users/change-username', {
        username,
      })
      .subscribe(
        (res) => {
          let userData: UserModel.UserInfo = res.data;

          this.UserInfo.next(userData);
          this.toastr.success('Change Username Success!');
        },
        (error) => {
          this.toastr.error(error?.error?.message);
        }
      );
  }

  // change-avatar
  ChangeAvatar(avatar: string) {
    this.http
      .patch<any>(API_URL + '/users/change-avatar', { avatar })
      .subscribe(
        (res) => {
          let userData: UserModel.UserInfo = res.data;

          this.UserInfo.next(userData);
          this.toastr.success('Change Avatar Success!');
        },
        (error) => {
          this.toastr.error(error?.error?.message);
        }
      );
  }

  // Update profile
  UpdateProfile(updateInfo: UserModel.UserUpdate, id: number) {
    return this.http.patch<any>(API_URL + `/users/${id}`, updateInfo).subscribe(
      (res) => {
        let userData: UserModel.UserInfo = res.data;

        this.UserInfo.next(userData);
      },
      (error) => {
        this.toastr.error(error?.error?.message);
      }
    );
  }

  // Uploadfile

  UploadFile(file: File) {
    const formData = new FormData();

    formData.append('image', file);

    return this.http.post<any>(API_URL + '/uploads', formData);
  }

  // get current tokens
  // getAccessToken() {}

  // tạo DeiveId
  createDeviceId() {
    let deviceId = localStorage.getItem('devideId')
      ? localStorage.getItem('devideId')
      : Math.floor(Math.random() * 1000000).toString();

    return deviceId;
  }
}
