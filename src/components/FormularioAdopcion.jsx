import React, { useState } from 'react';

const FormularioAdopcion = () => {
    const [formulario, setFormulario] = useState({
        nombreMascota: '',
        descripcion: '',
        edad: '',
        imagen: '',
    });

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Adopción publicada:", formulario);
        // Aquí puedes hacer el POST al backend
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre de la mascota</label>
                <input
                    type="text"
                    name="nombreMascota"
                    value={formulario.nombreMascota}
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
                <label className="block text-sm font-medium text-gray-700">Edad (en años)</label>
                <input
                    type="number"
                    name="edad"
                    value={formulario.edad}
                    onChange={handleChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Imagen (URL)</label>
                <input
                    type="text"
                    name="imagen"
                    value={formulario.imagen}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <button
                type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
            >
                Publicar Adopción
            </button>
        </form>
    );
};

export default FormularioAdopcion;
