import { jwtDecode } from 'jwt-decode';

class AuthService {
    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token: string) {
        try {
            const decoded: any = jwtDecode(token);
            return decoded.exp < Date.now() / 1000;
        } catch (err) {
            return true;
        }
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    saveToken(token: string) {
        localStorage.setItem('id_token', token);
        window.location.assign('/');
    }

    clearToken() {
        localStorage.removeItem('id_token');
        // window.location.assign('/');
    }
}

export default new AuthService();