import { useState, useContext, createContext, useEffect } from "react";
import AuthService from "../services/auth.service";
import tokenService from "../services/token.service";

const AuthContext = createContext(null);
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUser);
    const login = (user) => setUser(user);
    const logout = () => {
        AuthService.logout();
        setUser(null);
    };

    useEffect(()=>{
        tokenService.setUser(user);
    },[user]);

    const getUser = () => {
        const currentUser = tokenService.getUser();
        return currentUser;
    };

    return (
        <AuthContext.Provider value={{ user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
