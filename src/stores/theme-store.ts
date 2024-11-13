import { create } from "zustand";
import { persist } from "zustand/middleware";

type Theme = "dark" | "light";

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: "light",

      setTheme: (theme) =>
        set((state) => {
          state.theme = theme;
          const root = window.document.documentElement;
          root.classList.remove("light", "dark");
          root.classList.add(state.theme);
          return { theme: theme };
        }),

      toggleTheme: () =>
        set((state) => {
          state.theme = state.theme === "dark" ? "light" : "dark";
          applyTheme(state.theme);
          return { theme: state.theme };
        }),
    }),
    {
      name: "vite-ui-theme",
      onRehydrateStorage: () => (state) => {
        if (state) {
          applyTheme(state.theme);
        }
      },
    },
  ),
);

function applyTheme(theme: Theme) {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(theme);
}
