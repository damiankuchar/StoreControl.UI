import { makeAutoObservable } from "mobx";

type Theme = "dark" | "light";

export class ThemeStore {
  theme: Theme = "light";
  storageKey: string = "vite-ui-theme";

  constructor() {
    makeAutoObservable(this);
    this.theme = (localStorage.getItem(this.storageKey) as Theme) ?? this.theme;
    this.applyTheme();
  }

  setTheme(theme: Theme) {
    this.theme = theme;
    localStorage.setItem(this.storageKey, theme);
    this.applyTheme();
  }

  private applyTheme() {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(this.theme);
  }
}
