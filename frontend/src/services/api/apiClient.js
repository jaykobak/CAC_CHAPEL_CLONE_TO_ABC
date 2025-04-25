import axios from "axios";
import useAuthStore from "@/stores/authStore";
import { useNavigate } from "react-router-dom";


const apiClient = axios.create({
    baseURL: "https://chapel-h3il.onrender.com/api/v1",
    // baseURL: "http://localhost:6000/api/v1",
    headers: {
        "Content-Type": "application/json",
    }
})

apiClient.interceptors.request.use(
    (config) => {
        const { isAuthenticated, accessToken } = useAuthStore.getState();

        if (isAuthenticated && accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 403) {
            const { logout } = useAuthStore.getState();
            logout();
            window.location.href = "/auth/login"; // Redirect to login page
        }

        return Promise.reject(error);
    }
);

export default apiClient;