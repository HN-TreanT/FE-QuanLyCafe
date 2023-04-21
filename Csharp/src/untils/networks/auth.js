import { serverConfig } from "../../const";
import axios from "axios"
export default class Auth {
    static saveToken(token){
        window.localStorage.setItem('token', token);
    }

    static removeToken() {
        window.localStorage.removeItem('token');
    }

    static async refreshToken(accessToken,refreshToken){
        try {
            const refreshRes = await axios.post(
                `${serverConfig.server}/api/Token/Refresh`,
                {
                  accessToken: accessToken,
                  refreshToken: refreshToken,
                }
              );
            const newToken = refreshRes?.data?.AccessToken;
            if(!newToken) {
                return false;
            }
            this.saveToken(newToken);
            return true;
        }
        catch (e) {
            this.removeToken();
            window.location.href = '/login';
            window.localStorage.clear();
        }
    }
}
