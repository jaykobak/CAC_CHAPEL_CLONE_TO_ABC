import axios from "axios";
import useAuthStore from "../stores/authStore";


const BASE_URL = 'http://localhost:6000/api/v1';

const client = axios.create({ baseURL: BASE_URL });

// Add a request interceptor to add the authentication token to every request
client.interceptors.request.use(
    function (config) {
        // Access Zustand's state using getState()
        // const { token } = useAuthStore.getState();
        const token = useAuthStore.getState().accessToken

        // console.log('..........', token)

        // Add the token to the request headers if available
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    function (error) {
        // Handle request errors
        return Promise.reject(error);
    }
);

export default client;