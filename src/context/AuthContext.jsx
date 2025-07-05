import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(
        !!localStorage.getItem('usuarioToñita')
    );

    const login = () => setUsuarioAutenticado(true);
    const logout = () => {
        setUsuarioAutenticado(false);
        localStorage.removeItem('usuarioToñita');
    };

    return (
        <AuthContext.Provider value={{ usuarioAutenticado, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);