import React, { useState } from 'react';
import {useLocalStorage} from '../libs/useLocalStorage';

const AuthContext = React.createContext({})

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useLocalStorage('token');
    const [admin, setAdmin] = useLocalStorage('admin');
    const [superAd, setSuperAd] = useLocalStorage('super');
    const [identifier, setIdentifier] = useLocalStorage('iden');
    const logIn = data => {
        setToken(data.token);
        setAdmin(data.admin);
        setSuperAd(data.superAd);
        setIdentifier(data.identifier);
    };
    const logOut = () => {
        setToken(null);
        setAdmin(null);
        setSuperAd(null);
        setIdentifier(null);
        localStorage.removeItem('token');
    };

    return <AuthContext.Provider value={{
        token,
        setToken,
        admin,
        setAdmin,
        superAd,
        setSuperAd,
        identifier,
        setIdentifier,
        logIn,
        logOut,
    }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;