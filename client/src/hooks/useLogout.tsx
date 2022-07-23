import axiosPrivate from "../api/ConfigAxios";
import useAuth from "./useAuth";

function useLogout() {
	const { setAuth } = useAuth();
	const controller = new AbortController();

	const logout = async () => {
		try {
			await axiosPrivate.get("logout", { signal: controller.signal });
			setAuth({});
		} catch (err) {
			console.error(err);
		}
	};
	return logout;
}

export default useLogout;
