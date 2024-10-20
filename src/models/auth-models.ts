export interface TokenData {
  userId: number;
  email: string;
  userName: string;
  permissions: string[];
  nbf: number;
  exp: number;
  iat: number;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
}

export interface RefreshRequest {
  token: string;
  refreshToken: string;
}

export interface RefreshResponse {
  token: string;
  refreshToken: string;
}