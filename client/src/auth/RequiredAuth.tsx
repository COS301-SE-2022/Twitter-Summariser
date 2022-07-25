import { Navigate, useLocation, Outlet } from "react-router-dom";
import jwt from "jwt-decode";
import useAuth from "../hooks/useAuth";

function RequiredAuth() {
	const { auth } = useAuth();
	const location = useLocation();

	if (auth?.accessToken) {
		const decodedToken = jwt(auth.accessToken);
		auth.username = (decodedToken as any).username;
		auth.apiKey = (decodedToken as any).apiKey;
		auth.email = (decodedToken as any).email;
	}

	return auth?.accessToken ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
}

export default RequiredAuth;
