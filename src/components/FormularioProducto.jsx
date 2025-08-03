import React, { useState } from 'react';
import axios from 'axios';

const FormularioProducto = () => {
    const [formulario, setFormulario] = useState({
        title: '',
        description: '',
        price: ''
    });

    const [imagenArchivo, setImagenArchivo] = useState(null);

    const handleChange = (e) => {
        setFormulario({
            ...formulario,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = JSON.parse(localStorage.getItem('usuarioToñita'))?.token;

        if (!token) {
            alert('Debes iniciar sesión para publicar un producto');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', formulario.title);
            formData.append('description', formulario.description);
            formData.append('price', formulario.price);
            formData.append('categoryId', 1); // Producto
            formData.append('image', imagenArchivo); // Archivo real

            const response = await axios.post('https://bk-tonita.onrender.com/api/publications', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Publicación exitosa:', response.data);
            alert('¡Producto publicado con éxito!');

            setFormulario({ title: '', description: '', price: '' });
            setImagenArchivo(null);

        } catch (error) {
            console.error('Error al publicar:', error.response?.data || error.message);
            alert('Error al publicar el producto');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="text"
                name="title"
                value={formulario.title}
                onChange={handleChange}
                required
                placeholder="Nombre del producto"
                className="w-full p-2 border rounded"
            />

            <textarea
                name="description"
                value={formulario.description}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Descripción"
                className="w-full p-2 border rounded"
            />

            <input
                type="number"
                name="price"
                value={formulario.price}
                onChange={handleChange}
                required
                placeholder="Precio"
                className="w-full p-2 border rounded"
            />

            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => setImagenArchivo(e.target.files[0])}
                required
                className="w-full p-2 border rounded"
            />

            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
                Publicar Producto
            </button>
        </form>
    );
};

export default FormularioProducto;
