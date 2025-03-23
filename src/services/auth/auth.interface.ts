export interface IBodyLogin {
  gmail: string;
  password: string;
}

export interface IBodyRegister {
  name: string;
  gmail: string;
  password: string;
  rePassword: string;
}

export interface IAuthInfo {
  accessToken: string;
  refreshToken: string;
  id: string;
}

export interface IUserInfo {
  gmail: string;
  name: string;
}
