import React, { useState } from 'react';

const FormularioServicio = () => {
    const [formulario, setFormulario] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
    });

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Servicio publicado:", formulario);
        // Aquí puedes hacer el POST al backend
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre del servicio</label>
                <input
                    type="text"
                    name="nombre"
                    value={formulario.nombre}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={handleChange}
                    rows="3"
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Precio</label>
                <input
                    type="number"
                    name="precio"
                    value={formulario.precio}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
                Publicar Servicio
            </button>
        </form>
    );
};

export default FormularioServicio;
