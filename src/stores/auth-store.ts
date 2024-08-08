import { makeAutoObservable } from "mobx";
import { jwtDecode } from "jwt-decode";
import { TokenData } from "@/models/auth-models";

export class AuthStore {
  token: string | null = null;
  userData: TokenData | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuth() {
    return !!this.token;
  }

  async login() {
    const response =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NWZhZGUwYS00MzQyLTQ4ZTUtYWI2Yi04ZjhiYzIwNDJjZjgiLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImZ1bGxfbmFtZSI6IkFkbWluIEFkbWluIiwicGVybWlzc2lvbnMiOlsiMjE0ZXJmd2VyZmQiLCJzZGZkc2ZzZGZkc2RzZnNkZmYzMjQ1NDY3OGl1amhmZ2QiXSwiZXhwIjoxNzIyODA5Njc0LCJpc3MiOiJJc3N1ZXIiLCJhdWQiOiJBdWRpZW5jZSJ9.4DE6cW_DJOnNAHc4HTuhKJDmwEfbcdhVeTc2FMXtNww";

    this.handleJwtToken(response);
  }

  logout() {
    this.token = null;
    this.userData = null;
    window.localStorage.removeItem("jwt");
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
}
