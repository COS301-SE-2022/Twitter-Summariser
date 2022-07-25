import axiosPrivate from "../api/ConfigAxios";
import useAuth from "./useAuth";

function useLogout() {
	const controller = new AbortController();
	const { auth, setAuth } = useAuth();

	const logout = async () => {
		try {
			await axiosPrivate.get("logout", { signal: controller.signal });
			setAuth(false);
			auth.accessToken = undefined;
		} catch (err) {
			console.error(err);
		}
	};
	return logout;
}

export default useLogout;
