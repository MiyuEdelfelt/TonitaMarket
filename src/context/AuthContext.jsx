import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [usuarioAutenticado, setUsuarioAutenticado] = useState(null);

    // Leer del localStorage al iniciar
    useEffect(() => {
        const usuarioGuardado = localStorage.getItem('usuarioToñita');
        if (usuarioGuardado) {
            setUsuarioAutenticado(JSON.parse(usuarioGuardado));
        }
    }, []);

    // Función de login que guarda el objeto completo
    const login = (usuarioData) => {
        setUsuarioAutenticado(usuarioData);
        localStorage.setItem('usuarioToñita', JSON.stringify(usuarioData));
    };

    const logout = () => {
        setUsuarioAutenticado(null);
        localStorage.removeItem('usuarioToñita');
    };

    return (
        <AuthContext.Provider value={{ usuarioAutenticado, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
