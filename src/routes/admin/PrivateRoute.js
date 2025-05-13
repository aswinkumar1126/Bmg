// src/router/PrivateRoute.js
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const auth = localStorage.getItem("auth");
    const isAuthenticated = auth === "true";
    const location = useLocation();

    return isAuthenticated ? (
        children
    ) : (
        <Navigate to="/login" replace state={{ from: location }} />
    );
};

export default PrivateRoute;
