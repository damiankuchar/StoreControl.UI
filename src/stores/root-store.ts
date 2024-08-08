import { createContext, useContext } from "react";
import { AuthStore } from "./auth-store";

export class RootStore {
  authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore();
  }
}

const rootStoreContext = createContext(new RootStore());

export const useStore = () => useContext(rootStoreContext);
