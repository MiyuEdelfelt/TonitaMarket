import React from 'react';
import FormularioServicio from '../components/FormularioServicio';

const PublicarServicio = () => {
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Publicar Servicio</h1>
            <FormularioServicio />
        </div>
    );
};

export default PublicarServicio;
