import axios from "axios";

 const axiosInstance = axios.create({
     baseURL: "http://69.62.81.92:8082/api/v1",  //BaseURL
    headers: {
        "Content-Type": "application/json",
    },
});
export const axiosAdminInstance = axios.create({
    baseURL: "http://localhost:8081/api/admin",  //BaseURL
    headers: {
        "Content-Type": "application/json",
    },
});
export const axiosInstanceAdmin = axios.create({
    baseURL: "http://localhost:8081/api/v1",  //BaseURL
    headers: {
        "Content-Type": "application/json",
    },
});

export default axiosInstance;