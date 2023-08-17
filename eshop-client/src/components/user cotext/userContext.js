import React, { createContext, useContext, useState } from 'react';

const userContext = createContext();

export default function UserContextProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    return (
        <userContext.Provider value={{ isLoggedIn, setIsLoggedIn, isAdmin, setIsAdmin }}>
            {children}
        </userContext.Provider>   //In line 3
    )
}


export function useUserContext() {
    return useContext(userContext);
}