import { AuthStore } from "./auth-store";
import { ThemeStore } from "./theme-store";

export class RootStore {
  authStore: AuthStore;
  themeStore: ThemeStore;

  constructor() {
    this.authStore = new AuthStore();
    this.themeStore = new ThemeStore();
  }
}

export const rootStore = new RootStore();
