import { makeAutoObservable } from "mobx";
import { jwtDecode } from "jwt-decode";
import { LoginRequest, RefreshRequest, TokenData } from "@/models/auth-models";
import { LoginFormData } from "@/components/login/login-form";
import { login, refresh } from "@/services/auth-service";
import moment from "moment";

export class AuthStore {
  token: string | null = null;
  refreshToken: string | null = null;
  tokenData: TokenData | null = null;
  loading: boolean = false;

  private readonly JWT_TOKEN: string = "jwt";
  private readonly REFRESH_TOKEN: string = "refresh";

  constructor() {
    makeAutoObservable(this);
  }

  get isAuth() {
    return !!this.token;
  }

  get isTokenExpired() {
    if (this.tokenData && this.token && this.refreshToken) {
      const currentTime = moment().unix();
      return this.tokenData.exp <= currentTime;
    }

    return false;
  }

  async login(loginFormData: LoginFormData) {
    try {
      this.loading = true;

      const loginRequest = this.mapLoginFormDataToLoginRequest(loginFormData);
      const loginResponse = await login(loginRequest);

      this.token = loginResponse.token;
      this.refreshToken = loginResponse.refreshToken;

      this.handleJwtToken();

      this.loading = false;
    } catch {
      this.loading = false;
    }
  }

  async refresh() {
    try {
      const refreshRequest = this.createRefreshRequest();
      const refreshResponse = await refresh(refreshRequest);

      this.token = refreshResponse.token;
      this.refreshToken = refreshResponse.refreshToken;

      this.handleJwtToken();
    } catch {
      this.clearStore();
      this.clearAuthLocalStorage();
    }
  }

  logout() {
    this.clearStore();
    this.clearAuthLocalStorage();
  }

  tryAutoLogin() {
    this.clearStore();
    const token = localStorage.getItem(this.JWT_TOKEN);
    const refreshToken = localStorage.getItem(this.REFRESH_TOKEN);

    if (!token) {
      this.clearAuthLocalStorage();
      return;
    }

    this.token = token;
    this.refreshToken = refreshToken;

    this.handleJwtToken();
  }

  hasPermission(permission: string) {
    if (!this.tokenData) {
      return false;
    }

    return this.tokenData.permissions?.includes(permission);
  }

  private handleJwtToken() {
    this.decodeJwtToken();
    this.saveTokensToLocalStorage();
  }

  private decodeJwtToken() {
    if (!this.token) {
      return;
    }

    this.tokenData = jwtDecode<TokenData>(this.token);
  }

  private saveTokensToLocalStorage() {
    if (!this.token || !this.refreshToken) {
      return;
    }

    window.localStorage.setItem(this.JWT_TOKEN, this.token);
    window.localStorage.setItem(this.REFRESH_TOKEN, this.refreshToken);
  }

  private clearStore() {
    this.token = null;
    this.refreshToken = null;
    this.tokenData = null;
  }

  private clearAuthLocalStorage() {
    window.localStorage.removeItem(this.JWT_TOKEN);
    window.localStorage.removeItem(this.REFRESH_TOKEN);
  }

  private mapLoginFormDataToLoginRequest(loginFormData: LoginFormData) {
    return {
      login: loginFormData.login,
      password: loginFormData.password,
    } as LoginRequest;
  }

  private createRefreshRequest() {
    return {
      token: this.token,
      refreshToken: this.refreshToken,
    } as RefreshRequest;
  }
}
