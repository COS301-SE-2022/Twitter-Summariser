import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, setAuth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                const newToken = await refresh();
                setAuth((prev: any) => { return { ...prev, accessToken: newToken } });
            } catch (error) {
                console.error(error);

            } finally {
                setIsLoading(false);
            }
        }
        console.log("In use effect");
        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`auth: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading]);

    return (
        <>
            {isLoading ? <div>Loading...</div> : <Outlet />}
        </>
    );
}

export default PersistLogin;