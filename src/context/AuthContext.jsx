import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect } from "react";
import { useState } from 'react';
import { auth } from "../Config/Firebase";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    
    const unsub = useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => {
            unsub();
        };
    }, []);
    
    return(
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };