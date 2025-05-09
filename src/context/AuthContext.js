// AuthContext.js
import React, { useState, createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");

        if (!mobileNumber) {
            setError("Mobile number is required");
            return;
        }
        if (!name) {
            setError("Name is required");
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
            const response = await axios.post("http://localhost:8081/api/admin/create", {
                mobileNumber,
                name,
                password,
            });

            if (response.data) {
                // Save to localStorage
                localStorage.setItem("admin", JSON.stringify(response.data));

                // Navigate to home after slight delay for animation
                setTimeout(() => {
                    navigate("/");
                }, 1000);
            }
        } catch (err) {
            console.error("Error during login:", err);
            setError(err.response?.data?.message || "Login failed. Please try again.");
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
                setMobileNumber,
                setName,
                setPassword,
                handleLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};