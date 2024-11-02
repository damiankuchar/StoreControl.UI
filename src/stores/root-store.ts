import { configure } from "mobx";
import { AuthStore } from "./auth-store";
import { SidebarStore } from "./sidebar-store";
import { ThemeStore } from "./theme-store";
import { UsersStore } from "./users-store";

configure({
  enforceActions: "never", // disables strict-mode
});

export class RootStore {
  authStore: AuthStore;
  themeStore: ThemeStore;
  sidebarStore: SidebarStore;
  usersStore: UsersStore;

  constructor() {
    this.authStore = new AuthStore();
    this.themeStore = new ThemeStore();
    this.sidebarStore = new SidebarStore();
    this.usersStore = new UsersStore();
  }
}

export const rootStore = new RootStore();
