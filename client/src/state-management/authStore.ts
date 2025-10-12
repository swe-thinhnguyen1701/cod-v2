import { create } from "zustand";
import { client } from "../apollo/client";
import { GET_ME } from "../graphql/queries";
import AuthService from "../utils/auth";
import type User from "../entities/UserEntity";

interface AuthState {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: AuthService.getToken(),
  user: null,
  isLoggedIn:
    !!AuthService.getToken() &&
    !AuthService.isTokenExpired(AuthService.getToken()!),
  loading: true,

  login: async (token: string) => {
    set({ loading: true });

    AuthService.saveToken(token);
    try {
      const { data } = await client.query({
        query: GET_ME,
        fetchPolicy: "network-only",
      });
      set({ token, user: data.me, isLoggedIn: true, loading: false });
    } catch {
      set({ token: null, user: null, isLoggedIn: false, loading: false });
    }
  },
  logout: async () => {
    set({ loading: true });

    AuthService.clearToken();
    await client.clearStore();
    set({ token: null, user: null, isLoggedIn: false, loading: false });
  },
  checkAuth: async () => {
    set({ loading: true });

    const token = AuthService.getToken();
    if (!token || AuthService.isTokenExpired(token)) {
      set({ token: null, user: null, isLoggedIn: false, loading: false });
      return;
    }

    try {
      const { data } = await client.query({ query: GET_ME });
      set({ token, isLoggedIn: true, user: data.me, loading: false });
    } catch {
      set({ token: null, user: null, isLoggedIn: false, loading: false });
    }
  },
}));
