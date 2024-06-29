import { createContext, useContext, useState } from "react";





const SessionContext = createContext();

export const useSession = () => useContext(SessionContext);

export const SessionProvider = ({ children }) => {

    const [token, setToken] = useState(localStorage.getItem('session') || null);

    const saveToken = (argument) => {
        localStorage.setItem('session', argument);
        setToken(argument);
    };

    const clearToken = () => {
        localStorage.removeItem('session');
        setToken(null);
    };

    return (
        <SessionContext.Provider value={{ token, saveToken, clearToken }}>
            {children}
        </SessionContext.Provider>
    );
}






