import axios from "../api/ConfigAxios";
import useAuth from "./useAuth";

function useRefreshToken() {
	const { setAuth } = useAuth();
	const controller = new AbortController();

	const refresh = async () => {
		const response = await axios.get("refresh", {
			withCredentials: true,
			signal: controller.signal
		});
		setAuth((prev: any) => ({ ...prev, accessToken: response.data.accessToken }));
		return response.data.accessToken;
	};
	return refresh;
}

export default useRefreshToken;
