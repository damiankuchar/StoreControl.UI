import { TokenData } from "@/models/auth-models";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  refreshToken: string | null;
  tokenData: TokenData | null;
  isAuth: () => boolean;
  hasPermission: (permission: string) => boolean;
  isTokenExpired: () => boolean;
  setTokens: (token: string, refreshToken: string) => void;
  clearTokens: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      tokenData: null,

      isAuth: () => {
        return !!get().token;
      },

      hasPermission: (permission) => {
        const tokenData = get().tokenData;

        if (!tokenData) {
          return false;
        }

        return tokenData.permissions?.includes(permission);
      },

      isTokenExpired: () => {
        const tokenData = get().tokenData;
        const token = get().token;
        const refreshToken = get().refreshToken;

        if (token && refreshToken && tokenData) {
          const currentTime = moment().unix();
          return tokenData.exp <= currentTime;
        }

        return false;
      },

      setTokens: (token, refreshToken) =>
        set((state) => {
          state.token = token;
          state.refreshToken = refreshToken;
          state.tokenData = jwtDecode<TokenData>(token);
          return { token: token };
        }),

      clearTokens: () =>
        set(() => ({
          token: null,
          refreshToken: null,
          tokenData: null,
        })),
    }),
    {
      name: "jwt",
      partialize: (state) => ({ token: state.token, refreshToken: state.refreshToken }),
      onRehydrateStorage: () => (state) => {
        if (state && state.token && state.refreshToken) {
          state.tokenData = jwtDecode<TokenData>(state.token);
        } else {
          state?.clearTokens();
        }
      },
    },
  ),
);
