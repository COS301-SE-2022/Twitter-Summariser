import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import axios from "../api/ConfigAxios";
import useAuth from "./useAuth";

function useRefreshToken() {
	const { setAuth } = useAuth();
	const controller = new AbortController();
	const navigate = useNavigate();

	const refresh = async () => {
		try {
			const response = await axios.get("refresh", {
				withCredentials: true,
				signal: controller.signal
			});
			setAuth((prev: any) => ({ ...prev, accessToken: response.data.accessToken }));
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
