import axios from 'axios';
const baseURL = import.meta.env.VITE_API_URL;
import tokenService from './token.service';

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

//add interceptors to request object
instance.interceptors.request.use(
    (config) => {
        //recieive after logged in
        const token = tokenService.getLocalAccessToken();
        if (token) {
            config.headers["x-access-token"] = token;
        }
        return config;

    },
    (err) => {
        return Promise.reject(err);
    }
);

export default instance;