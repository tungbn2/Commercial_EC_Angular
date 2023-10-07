import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { API_URL } from '../../Constants/endpoint.conts';
import * as UserModel from 'src/app/Core/Models/user.model';

interface Params {
  role: string;
  size: string;
  page: string;
}

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(private http: HttpClient) {}

  // Admin function to change user
  CreateUser(userData: UserModel.UserCreate) {
    return this.http.post<any>(API_URL + '/users', userData);
  }

  QueryUser(params: Params) {
    return this.http.get<any>(API_URL + '/users', {
      params: new HttpParams({ fromObject: { ...params } }),
    });
  }

  GetUserById(id: any) {
    return this.http.get<any>(API_URL + `/users/${id}`);
  }

  getMyProfile(){
    return this.http.get<any>(API_URL + 'users/my-profile')
  }

  updateUserById(updateInfo: UserModel.UserUpdate, id: number) {
    return this.http.patch<any>(API_URL + `/users/${id}`, updateInfo);
  }

  deleteUserById(id: number) {
    return this.http.delete<any>(API_URL + `/users/${id}`);
  }
}
