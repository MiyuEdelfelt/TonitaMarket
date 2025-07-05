import React from 'react';
import FormularioAdopcion from '../components/FormularioAdopcion';

const PublicarAdopcion = () => {
    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">Publicar Adopción</h1>
            <FormularioAdopcion />
        </div>
    );
};

export default PublicarAdopcion;
