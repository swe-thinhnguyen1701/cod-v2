import { create } from "zustand";
import { client } from "../apollo/client";
import { GET_ME } from "../graphql/queries";
import AuthService from "../utils/auth";
import type User from "../entities/UserEntity";

interface AuthState {
    token: string | null;
    user: User | null;
    isLoggedIn: boolean;
    login: (token: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: AuthService.getToken(),
    user: null,
    isLoggedIn: !!AuthService.getToken() && !AuthService.isTokenExpired(AuthService.getToken()!),

    login: async (token: string) => {
        AuthService.saveToken(token);
        // console.log(token);
        try {
            const { data } = await client.query({ query: GET_ME });
            // console.log(data);
            set({ token, user: data.me, isLoggedIn: true });
        } catch (error) {
            set({ token: null, user: null, isLoggedIn: false })
        }
    },
    logout: () => {
        AuthService.clearToken();
        set({ token: null, user: null, isLoggedIn: false });
    },
    checkAuth: async () => {
        const token = AuthService.getToken();
        if (!token || AuthService.isTokenExpired(token)) {
            set({ token: null, user: null, isLoggedIn: false });
            return;
        }

        try {
            const {data} = await client.query({query: GET_ME});
            set({ token, isLoggedIn: true, user: data.me });
        } catch {
            set({ token: null, user: null, isLoggedIn: false });
        }
    }
}))