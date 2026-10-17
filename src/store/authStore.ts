import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types";

interface AuthState {
  token: string | null;
  user: User | null;
  userName: string | null;
  setAuth: (token: string, user: User) => void;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      userName: null,
      setAuth: (token: string, user: User) =>
        set({
          token,
          user,
          userName: user.name,
        }),
      login: (token: string, user: User) =>
        set({
          token,
          user,
          userName: user.name,
        }),
      logout: () =>
        set({
          token: null,
          user: null,
          userName: null,
        }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        userName: state.userName,
      }),
    }
  )
);

export default useAuthStore;
