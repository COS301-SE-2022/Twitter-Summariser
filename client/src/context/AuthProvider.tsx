import { createContext, useState } from "react";

const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: any) => {
	const [auth, setAuth] = useState({});
	const [persist, setPersist] = useState(localStorage.getItem("persist") === "true");
	return <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
