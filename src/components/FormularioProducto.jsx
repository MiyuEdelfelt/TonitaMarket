import React, { useState } from 'react';

const FormularioProducto = () => {
    const [formulario, setFormulario] = useState({
        title_publication: '',
        description_publication: '',
        price_publication: '',
        image_publication: '',
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
            category_id: 1, // Producto
            user_id: 1,     // Usuario ficticio
        };

        console.log("Producto publicado:", payload);
        // Aquí iría el POST al backend real
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="title_publication" value={formulario.title_publication}
                onChange={handleChange} required placeholder="Nombre del producto"
                className="w-full p-2 border rounded" />

            <textarea name="description_publication" value={formulario.description_publication}
                onChange={handleChange} required rows={3} placeholder="Descripción"
                className="w-full p-2 border rounded" />

            <input type="number" name="price_publication" value={formulario.price_publication}
                onChange={handleChange} required placeholder="Precio"
                className="w-full p-2 border rounded" />

            <input type="text" name="image_publication" value={formulario.image_publication}
                onChange={handleChange} placeholder="Imagen URL" className="w-full p-2 border rounded" />

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Publicar Producto
            </button>
        </form>
    );
};

export default FormularioProducto;
