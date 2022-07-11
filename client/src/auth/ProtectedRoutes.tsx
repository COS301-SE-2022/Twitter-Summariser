import { Navigate, Outlet } from "react-router-dom";

const userAuthentication = () => {
	const user = { loggedIn: localStorage.getItem("key") ? true : false };
	return user && user.loggedIn;
};

function ProtectedRoutes() {
	const isAunthenticated = userAuthentication();
	return isAunthenticated ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRoutes;
