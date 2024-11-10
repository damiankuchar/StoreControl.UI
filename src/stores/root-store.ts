import { configure } from "mobx";
import { AuthStore } from "./auth-store";
import { SidebarStore } from "./sidebar-store";
import { ThemeStore } from "./theme-store";

configure({
  enforceActions: "never", // disables strict-mode
});

export class RootStore {
  authStore: AuthStore;
  themeStore: ThemeStore;
  sidebarStore: SidebarStore;

  constructor() {
    this.authStore = new AuthStore();
    this.themeStore = new ThemeStore();
    this.sidebarStore = new SidebarStore();
  }
}

export const rootStore = new RootStore();
