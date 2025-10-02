import {create} from "zustand";
import AuthService from "../utils/auth";

interface AuthState {
    token: string | null;
    isLoggedIn: boolean;
    login: (token: string) => void;
    logout: () => void;
    checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: AuthService.getToken(),
    isLoggedIn: !!AuthService.getToken() && !AuthService.isTokenExpired(AuthService.getToken()!),

    login: (token: string) => {
        AuthService.saveToken(token);
        set({ token, isLoggedIn: true });
    },
    logout: () => {
        AuthService.clearToken();
        set({ token: null, isLoggedIn: false });
    },
    checkAuth: () => {
        const token = AuthService.getToken();
        set({ token, isLoggedIn: !!token && !AuthService.isTokenExpired(token) });
    }
}))