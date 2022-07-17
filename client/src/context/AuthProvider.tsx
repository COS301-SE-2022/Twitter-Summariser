import { createContext, ReactNode, useState } from 'react';

type Props = {
    children: ReactNode;
};

const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: Props) => {
    const [isAuthenticated, setIsAuthenticated] = useState({});

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;