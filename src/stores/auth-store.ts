import { makeAutoObservable } from "mobx";
import { jwtDecode } from "jwt-decode";
import { LoginRequest, TokenData } from "@/models/auth-models";
import { LoginFormData } from "@/components/login/login-form";
import { login } from "@/services/auth-service";

export class AuthStore {
  token: string | null = null;
  userData: TokenData | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuth() {
    return !!this.token;
  }

  async login(loginFormData: LoginFormData) {
    try {
      this.loading = true;

      const loginRequest = this.mapLoginFormDataToLoginRequest(loginFormData);
      const loginResponse = await login(loginRequest);
      this.handleJwtToken(loginResponse.token);

      this.loading = false;
    } catch {
      this.loading = false;
    }
  }

  logout() {
    this.clearStore();
    window.localStorage.removeItem("jwt");
  }

  tryAutoLogin() {
    this.clearStore();
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    this.handleJwtToken(token);
  }

  hasPermission(permission: string) {
    if (!this.userData) {
      return false;
    }

    return this.userData.permissions.includes(permission);
  }

  handleJwtToken(token: string) {
    this.token = token;
    this.decodeJwtToken();
    this.saveTokenToLocalStorage();
  }

  decodeJwtToken() {
    if (!this.token) {
      return;
    }

    this.userData = jwtDecode<TokenData>(this.token);
  }

  saveTokenToLocalStorage() {
    if (!this.token) {
      return;
    }

    window.localStorage.setItem("jwt", this.token);
  }

  clearStore() {
    this.token = null;
    this.userData = null;
  }

  mapLoginFormDataToLoginRequest(loginFormData: LoginFormData) {
    return {
      login: loginFormData.login,
      password: loginFormData.password,
    } as LoginRequest;
  }
}
