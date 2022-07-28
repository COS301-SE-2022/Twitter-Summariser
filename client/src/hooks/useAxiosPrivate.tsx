import { useEffect } from "react";
import axiosPrivate from "../api/ConfigAxios";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
	const { auth } = useAuth();
	const refresh = useRefreshToken();

	useEffect(() => {
		const requestInterceptor = axiosPrivate.interceptors.request.use(
			(config) => {
				if (!(config.headers as any).Authorization) {
					(config.headers as any).Authorization = `${auth?.accessToken}`;
				}
				return config;
			},
			(error) => Promise.reject(error)
		);

		const responseInterceptor = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;
					console.log("Before refresh");
					const newToken = await refresh();
					console.log("Refreshed token", newToken);
					prevRequest.headers.Authorization = `${newToken}`;
					return axiosPrivate(prevRequest);
				}
				return Promise.reject(error);
			}
		);
		return () => {
			axiosPrivate.interceptors.request.eject(requestInterceptor);
			axiosPrivate.interceptors.response.eject(responseInterceptor);
		};
	}, [auth, refresh]);

	return axiosPrivate;
};

export default useAxiosPrivate;
