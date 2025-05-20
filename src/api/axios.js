import axios from "axios";

// Base axios instance - no change
const axiosInstance = axios.create({
    baseURL: "https://api.bmgjewellers.com/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// Admin axios without auth (if you want to keep it separate)
export const axiosAdminInstance = axios.create({
    baseURL: "http://api.bmgjewellers.com/admin",
    headers: {
        "Content-Type": "application/json",
    },
});

// Admin axios with auth interceptor
export const axiosInstanceAdmin = axios.create({
    baseURL: "https://api.bmgjewellers.com/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor to inject Authorization header dynamically
axiosInstanceAdmin.interceptors.request.use(
    (config) => {
        // Retrieve token from localStorage or other storage
        const token = localStorage.getItem("admin_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
