import axios from "../api/axios";
import { handleAxiosError } from "../api/axios.error";
import Cookies from "universal-cookie";
class AuthService {

    cookies = new Cookies();
    async login(email: string, password: string) {
        const path = "auth/login";
        const body = {
            email,
            password
        }
        try {
            const result = await axios.post(path, body);
            if (result) this.setJwtCookie(result.data.token);
            return result.data;
        } catch (err) {
            return handleAxiosError(err)
        }

    }

    async register(email: string, password: string) {
        const path = "auth/register";
        const body = {
            email,
            password
        }
        try {
            const result = await axios.post(path, body);
            return result.data;
        } catch (err) {
            return handleAxiosError(err)
        }

    }

    setJwtCookie(token: string) {
        this.cookies.set('token', token, { maxAge: 60 * 60 * 24 * 30 })
    }

    getJwtCookie() {
        return this.cookies.get('token') ?? null;
    }

    logout(){
        this.cookies.remove('token');
    }
}

export default new AuthService();