import axios from '../api/ConfigAxios';
import useAuth from './useAuth';

function useLogout() {
    const { setAuth } = useAuth();
    const controller = new AbortController();

    const logout = async () => {
        setAuth({});
        try {
            console.log("in logout async function");

            await axios.get('logout', {
                withCredentials: true,
                signal: controller.signal
            });
        } catch (err) {
            console.log("in logout async function catch. Something went wrong");

            console.error(err);
        }
    }
    return logout;
}

export default useLogout;