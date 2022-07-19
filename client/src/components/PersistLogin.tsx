import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const refreh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {


    })
}

export default PersistLogin;