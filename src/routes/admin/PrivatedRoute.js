import React from "react";
import { Navigate } from "react-router-dom";

const PrivatedRoute = ({ children }) => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
        // Not logged in, redirect to login
        return <Navigate to="/login" replace />;
    }

    // Token present, render children (admin panel)
    return children;
};

export default PrivatedRoute;
 