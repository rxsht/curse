import { create } from "zustand";
import { User } from "../shared/types";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  filters: { city: string; category: string };
  setTokens: (access: string, refresh: string, user?: User | null) => void;
  setUser: (user: User | null) => void;
  setFilters: (filters: Partial<AuthState["filters"]>) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  user: (() => {
    const raw = localStorage.getItem("user");
    return raw ? (JSON.parse(raw) as User) : null;
  })(),
  filters: { city: "", category: "" },
  setTokens: (access, refresh, user) =>
    set((state) => {
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      const nextUser = user ?? state.user;
      if (nextUser) localStorage.setItem("user", JSON.stringify(nextUser));
      return { accessToken: access, refreshToken: refresh, user: nextUser };
    }),
  setUser: (user) =>
    set(() => {
      if (user) localStorage.setItem("user", JSON.stringify(user));
      else localStorage.removeItem("user");
      return { user };
    }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  logout: () =>
    set(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      return { accessToken: null, refreshToken: null, user: null };
    })
}));
