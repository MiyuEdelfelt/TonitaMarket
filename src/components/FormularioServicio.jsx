import React, { useState } from 'react';
import axios from 'axios';

const FormularioServicio = () => {
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
            alert('Debes iniciar sesión para publicar un servicio');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', formulario.title);
            formData.append('description', formulario.description);
            if (formulario.price) {
                formData.append('price', formulario.price); // opcional
            }
            formData.append('categoryId', 2); // Servicio
            if (imagenArchivo) {
                formData.append('image', imagenArchivo); // archivo real
            }

            const response = await axios.post('https://bk-tonita.onrender.com/api/publications', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Servicio publicado:', response.data);
            alert('¡Servicio publicado con éxito!');
            setFormulario({ title: '', description: '', price: '' });
            setImagenArchivo(null);

        } catch (error) {
            console.error('Error al publicar servicio:', error.response?.data || error.message);
            alert('Error al publicar el servicio');
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
                placeholder="Nombre del servicio"
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
                placeholder="Precio (opcional)"
                className="w-full p-2 border rounded"
            />

            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => setImagenArchivo(e.target.files[0])}
                className="w-full p-2 border rounded"
            />

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Publicar Servicio
            </button>
        </form>
    );
};

export default FormularioServicio;
