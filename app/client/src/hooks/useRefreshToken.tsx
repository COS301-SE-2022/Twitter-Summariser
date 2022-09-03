import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../api/ConfigAxios";
import useAuth from "./useAuth";

function useRefreshToken() {
	const { setAuth } = useAuth();
	const navigate = useNavigate();
	const controller = new AbortController();

	const refresh = async () => {
		try {
			const response = await axiosPrivate.get("refresh", {
				signal: controller.signal
			});
			setAuth((prev: any) => ({
				...prev,
				apiKey: response.data.apiKey,
				username: response.data.username,
				email: response.data.email,
				accessToken: response.data.accessToken,
				profileKey: response.data.profileKey
			}));
			return response.data.accessToken;
		}
		catch (error) {
			if ((error as AxiosError).response?.status === 401) {
				navigate("/login")
			}
			return null;
		}
	};
	return refresh;
}

export default useRefreshToken;
