import { createContext, useContext, useState } from 'react';

const PublicationsContext = createContext();

export const PublicationsProvider = ({ children }) => {
    const [publications, setPublications] = useState([]);

    const agregarPublicacion = (nueva) => {
        setPublications((prev) => [...prev, nueva]);
    };

    return (
        <PublicationsContext.Provider value={{ publications, agregarPublicacion }}>
            {children}
        </PublicationsContext.Provider>
    );
};

export const usePublications = () => useContext(PublicationsContext);
