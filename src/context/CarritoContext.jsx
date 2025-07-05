import React, { createContext, useState, useContext } from 'react';

const CarritoContext = createContext();

export const useCarrito = () => useContext(CarritoContext);

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (item) => {
        setCarrito((prev) => [...prev, item]);
    };

    const eliminarDelCarrito = (id) => {
        setCarrito((prev) => prev.filter((i) => i.id !== id));
    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito, limpiarCarrito }}>
            {children}
        </CarritoContext.Provider>
    );
};