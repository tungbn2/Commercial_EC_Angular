export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegis {
  username: string;
  email: string;
  password: string;
}

export interface UserCreate {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface UserStore {
  username: string;
  role: string;
  accessToken: string;
  expiredAccessDate: any;
  refreshToken: string;
  expiredRefreshDate: any;
}

export interface UserInfo {
  id: number;
  username: string;
  email: string;
  password: string;
  contact: null | string;
  avatar: null | string;
  role: string;
  isEmailVerified: boolean;
  isContactVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserUpdate {
  username?: string;
  email?: string;
  password?: string;
  contact?: null | string;
  avatar?: null | string;
  role?: string;
  isEmailVerified?: boolean;
  isContactVerified?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Tokens {
  access: TokenData;
  refresh: TokenData;
}

export interface TokenData {
  token: string;
  expires: string;
}

export interface DeviceData {
  refreshToken: string;
  deviceId: string;
}

export interface UserData extends UserInfo, TokenData {
  user: UserInfo;
  tokens: {
    access: TokenData;
    refresh: TokenData;
  };
  deviceId: string;
}
