export interface TokenData {
  userId: number;
  email: string;
  userName: string;
  permissions: string[];
  nbf: number;
  exp: number;
  iat: number;
}
