import axios from '../api/ConfigAxios';
import useAuth from './useAuth';

function useLogout() {
    const { setAuth } = useAuth();
    const controller = new AbortController();

    const logout = async () => {
        setAuth({});
        try {
            await axios.post('logout', {}, {
                withCredentials: true,
                signal: controller.signal
            });
        } catch (err) {
            console.error(err);
        }
    }
    return logout;
}

export default useLogout;