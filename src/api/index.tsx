import axios from "axios";
import { jwtDecode } from "jwt-decode";

const baseURL = import.meta.env.VITE_API_URL;

const instance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
});

const pathRequireToken = [
    "/api/user",
    "/api/cart",
    "/api/addproduct",
    "/api/deleteitem",
];

instance.interceptors.request.use(
    async (config) => {
        const requiresToken = pathRequireToken.some((path) => config.url?.includes(path));
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const expireAccessToken = accessToken ? token_expire(accessToken) : false;
        const expireRefreshToken = refreshToken ? token_expire(refreshToken): false;

        if (expireAccessToken && requiresToken) {
            if (!expireRefreshToken) {
                try {
                    const new_access_token = await refresh_Token(refreshToken as string);
                    config.headers.Authorization = "Bearer " + new_access_token;
                } catch (err) {
                    return Promise.reject(err);
                }
            } else {
                window.location.href = "/login";
                return Promise.reject("Token Expire");
            }
        } 
        else {
            config.headers.Authorization = "Bearer " + accessToken;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (err) => {
        if (err.response.status === 401) {
            window.location.href = "/login";
        }
        return Promise.reject(err);
    }
);

function token_expire(token: string):boolean {
    const decode = jwtDecode(token);
    const exp = decode.exp as number;
    const currentTime = Math.floor(Date.now() / 1000);
    return exp < currentTime;
}

async function refresh_Token(refreshtoken: string) {
    try {
        const result = await axios.post(
            baseURL + "/api/refreshtoken",
            {},
            { headers: { Authorization: "Bearer " + refreshtoken } }
        );
        if (result.data.accessToken) {
            localStorage.setItem("accessToken", result.data.accessToken);
            localStorage.setItem("refreshToken", result.data.refreshToken);
            return result.data.accessToken;
        }
    } catch (err) {
        throw new Error("Unauthorized");
    }
}

export default instance;
