import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

function PersistLogin() {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const navigate = useNavigate();
	const { auth, persist } = useAuth();

	useEffect(() => {
		const verifyRefreshToken = async () => {
			try {
				if (persist && auth.accessToken !== undefined) await refresh();
			} catch (error) {
				navigate("/login");
			} finally {
				setIsLoading(false);
			}
		};
		!auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
	}, [auth.accessToken, navigate, persist, refresh]);

	return <>{isLoading ? <div>Loading...</div> : <Outlet />}</>;
}

export default PersistLogin;
