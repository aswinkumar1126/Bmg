import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signupAdmin, loginAdmin } from "../services/profile/profileService"; // adjust path if needed

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [key, setKey] = useState(""); // for signup secretKey
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [mode, setMode] = useState("login"); // "login" or "signup"
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const navigate = useNavigate();

    const login = () => setIsAuthenticated(true);
    const logout = () => {
        setIsAuthenticated(false);
        // localStorage.removeItem("auth");
        // localStorage.removeItem("auth_id");
        navigate("/admin-auth");
    };

    useEffect(() => {
        const authStatus = localStorage.getItem("auth_id");
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
        if(mode === "signup" && !email){
            setError("Email is required for signup")
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
                    email,
                    secretKey: key,
                    registerAt: new Date().toISOString(),
                };
                responseData = await signupAdmin(payload);
            } else {
                responseData = await loginAdmin(mobileNumber, password);
            }

            if (responseData) {
                console.log(responseData);
                const token = responseData.admin_token; // ✅ make sure backend sends this
                let adminId;

                if (mode === "signup") {
                    // signup response has id at root level
                    adminId = responseData.id;
                } else {
                    // login response has admin.id
                    adminId = responseData.admin?.id;
                }
                // ✅ Store token and admin id
                localStorage.setItem("admin_token", token);
                localStorage.setItem("auth_id", adminId);

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
                email,
                mode,
                loading,
                error,
                isAuthenticated,
                setMobileNumber,
                setName,
                setPassword,
                setEmail,
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
