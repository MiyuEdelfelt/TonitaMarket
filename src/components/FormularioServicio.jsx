import React, { useState } from 'react';

const FormularioServicio = () => {
    const [formulario, setFormulario] = useState({
        title_publication: '',
        description_publication: '',
        price_publication: '',
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
            ...formulario,
            image_publication: 'https://via.placeholder.com/300', // opcional por ahora
            category_id: 2, // Servicio
            user_id: 1,     // Usuario ficticio
        };

        console.log("Servicio publicado:", payload);
        // POST al backend real aquí
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="title_publication" value={formulario.title_publication}
                onChange={handleChange} required placeholder="Nombre del servicio"
                className="w-full p-2 border rounded" />

            <textarea name="description_publication" value={formulario.description_publication}
                onChange={handleChange} required rows={3} placeholder="Descripción"
                className="w-full p-2 border rounded" />

            <input type="number" name="price_publication" value={formulario.price_publication}
                onChange={handleChange} required placeholder="Precio"
                className="w-full p-2 border rounded" />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Publicar Servicio
            </button>
        </form>
    );
};

export default FormularioServicio;
