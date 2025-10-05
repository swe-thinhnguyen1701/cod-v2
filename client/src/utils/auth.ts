import { jwtDecode } from "jwt-decode";

interface DecodeToken {
    data: {
        _id: string,
        username: string,
        email: string,
        isAdmin: boolean
    },
    iat: number,
    exp: number
}

class AuthService {
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token: string) {
        try {
            const decoded: DecodeToken = jwtDecode(token);
            return decoded.exp < Date.now() / 1000;
        } catch {
            return true;
        }
    }

    getToken() {
        return localStorage.getItem("id_token");
    }

    saveToken(token: string) {
        localStorage.setItem("id_token", token);
    }

    clearToken() {
        localStorage.removeItem("id_token");
    }
}

export default new AuthService();