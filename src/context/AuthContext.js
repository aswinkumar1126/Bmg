import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signupAdmin, loginAdmin } from "../services/profile/profileService"; // adjust path if needed

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [key, setKey] = useState(""); // for signup secretKey
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mode, setMode] = useState("login"); // "login" or "signup"
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        localStorage.removeItem("auth");
        localStorage.removeItem("auth_id");
        navigate("/admin-auth");
    };

    useEffect(() => {
        const authStatus = localStorage.getItem("auth");
        if (authStatus === "true") {
            setIsAuthenticated(true);
        }
    }, []);

    const handleAuth = async () => {
        setError("");

        // Validation
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
            let responseData;

            if (mode === "signup") {
                const payload = {
                    mobileNumber,
                    name,
                    password,
                    secretKey: key,
                };
                responseData = await signupAdmin(payload);
            } else {
                responseData = await loginAdmin(mobileNumber, password);
            }

            if (responseData) {
                localStorage.setItem("auth", "true");
                localStorage.setItem("auth_id", responseData.id);
                login();
                navigate("/admin");
            }
        } catch (err) {
            console.error("Auth error:", err);
            setError(err?.response?.data?.message || "Authentication failed. Please try again.");
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
                key,
                mode,
                loading,
                error,
                isAuthenticated,
                setMobileNumber,
                setName,
                setPassword,
                setKey,
                setMode,
                handleAuth,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
