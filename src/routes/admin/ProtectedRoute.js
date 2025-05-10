import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/login" />

}