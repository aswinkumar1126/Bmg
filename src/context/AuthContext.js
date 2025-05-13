import React, { useState, createContext , useEffect } from "react";
import axios from "axios";
import { useNavigate   } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mode, setMode] = useState("login"); // "login" or "signup"
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const[key, setKey] = useState("");

    const login = () => setIsAuthenticated(true);
    const logout = () => setIsAuthenticated(false);
    const navigate = useNavigate();


    useEffect(() => {
        const authStatus = localStorage.getItem("auth");
        if (authStatus === "true") {
            setIsAuthenticated(true);
        }
    }, []);
    
    const handleAuth = async () => {
        setError("");

        if (!mobileNumber) {
            setError("Mobile number is required");
            return;
        }
        if (mode === "signup" && !name) {
            setError("Name is required for signup");
            return;
        }
        if (!password) {
            setError("Password is required");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }

        setLoading(true);

        try {
            const url = mode === "signup"
                ? "http://localhost:8081/api/admin/signup"
                : "http://localhost:8081/api/admin/login";

            const payload = mode === "signup"
                ? { mobileNumber, name, password, secretKey:key} 
                : { mobileNumber, password };

            const response = await axios.post(url, payload);

            if (response.data) {
                localStorage.setItem("auth", "true"); // Set correct key and value
                localStorage.setItem("auth_id", response.data.id); // Optional: store ID
                login(); // update context
                navigate("/admin");
            }
        } catch (err) {
            console.error("Auth error:", err);
            setError(err.response?.data?.message || "Authentication failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                mobileNumber,
                name,
                password,
                loading,
                error,
                mode,
                setMode,
                setMobileNumber,
                setName,
                setPassword,
                handleAuth,
                isAuthenticated,
                login, 
                logout,key,setKey
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
