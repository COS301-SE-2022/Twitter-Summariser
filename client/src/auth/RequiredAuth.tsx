import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequiredAuth = () => {
    const { authenticated } = useAuth();
    const location = useLocation();

    return (
        authenticated?.username ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequiredAuth;
