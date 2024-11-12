import { configure } from "mobx";
import { AuthStore } from "./auth-store";
import { SidebarStore } from "./sidebar-store";

configure({
  enforceActions: "never", // disables strict-mode
});

export class RootStore {
  authStore: AuthStore;
  sidebarStore: SidebarStore;

  constructor() {
    this.authStore = new AuthStore();
    this.sidebarStore = new SidebarStore();
  }
}

export const rootStore = new RootStore();
