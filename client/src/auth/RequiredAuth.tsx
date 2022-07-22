import { Navigate, useLocation, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import jwt from 'jwt-decode';

const RequiredAuth = () => {
	const { auth } = useAuth();
	const location = useLocation();

	if (auth?.accessToken) {
		const decoded_token = jwt(auth.accessToken);
		auth.username = (decoded_token as any).username;
		auth.apiKey = (decoded_token as any).apiKey;
		auth.email = (decoded_token as any).email;
	}

	return auth?.accessToken ? (
		<Outlet />
	) : (
		<Navigate to="/login" state={{ from: location }} replace />
	);
};

export default RequiredAuth;
