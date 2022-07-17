import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequiredAuth = () => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.username && auth?.apiKey && auth?.accessToken && auth?.email ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequiredAuth;
