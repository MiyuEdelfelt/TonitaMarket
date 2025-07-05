import React from 'react';
import FormularioProducto from '../components/FormularioProducto';

const PublicarProducto = () => {
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Publicar Producto</h1>
            <FormularioProducto />
        </div>
    );
};

export default PublicarProducto;
