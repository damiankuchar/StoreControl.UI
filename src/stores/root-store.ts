import { configure } from "mobx";
import { AuthStore } from "./auth-store";

configure({
  enforceActions: "never", // disables strict-mode
});

export class RootStore {
  authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore();
  }
}

export const rootStore = new RootStore();
