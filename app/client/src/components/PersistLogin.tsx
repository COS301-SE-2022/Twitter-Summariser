import { Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

function PersistLogin() {
	const [isLoading, setIsLoading] = useState(true);
	const refresh = useRefreshToken();
	const navigate = useNavigate();
	const { auth, persist } = useAuth();

	useEffect(() => {
		const verifyRefreshToken = async () => {
			setTimeout(async () => {
			try {
				if (persist) {
					await refresh();
				}
				else {
					navigate("/login");
				}
			} catch (error) {
				console.error(error);
			} finally {
				setTimeout(() => {
					setIsLoading(false);
				}, 2000);
			}
		}, 2000);
		};
		!auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
	}, [auth.accessToken, navigate, persist, refresh]);

	return <>{isLoading ? <div className="flex justify-center flex-col flex-row items-center h-screen w-screen"><ScaleLoader height={100} width={5} color="#023E8A"/></div> : <Outlet />}</>;
}

export default PersistLogin;
