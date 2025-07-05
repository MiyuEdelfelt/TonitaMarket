import React, { useState } from 'react';

const FormularioAdopcion = () => {
    const [formulario, setFormulario] = useState({
        title_publication: '',
        description_publication: '',
        image_publication: '',
        edad: '',
    });

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            title_publication: formulario.title_publication,
            description_publication: `${formulario.description_publication} | Edad: ${formulario.edad} año(s)`,
            image_publication: formulario.image_publication,
            price_publication: 0, // No aplica
            category_id: 3,       // Adopción
            user_id: 1,           // Usuario ficticio
        };

        console.log("Adopción publicada:", payload);
        // POST al backend real aquí
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="title_publication" value={formulario.title_publication}
                onChange={handleChange} required placeholder="Nombre de la mascota"
                className="w-full p-2 border rounded" />

            <textarea name="description_publication" value={formulario.description_publication}
                onChange={handleChange} required rows={3} placeholder="Descripción"
                className="w-full p-2 border rounded" />

            <input type="number" name="edad" value={formulario.edad}
                onChange={handleChange} required placeholder="Edad"
                className="w-full p-2 border rounded" />

            <input type="text" name="image_publication" value={formulario.image_publication}
                onChange={handleChange} placeholder="Imagen URL"
                className="w-full p-2 border rounded" />

            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
                Publicar Adopción
            </button>
        </form>
    );
};

export default FormularioAdopcion;
