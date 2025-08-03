import React, { useState } from 'react';
import axios from 'axios';

const FormularioAdopcion = () => {
    const [formulario, setFormulario] = useState({
        title: '',
        description: '',
        edad: ''
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
            alert('Debes iniciar sesión para publicar una adopción');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', formulario.title);
            formData.append(
                'description',
                `${formulario.description} | Edad: ${formulario.edad} año(s)`
            );
            formData.append('categoryId', 3); // Adopción
            formData.append('price', 0); // Siempre 0
            if (imagenArchivo) {
                formData.append('image', imagenArchivo);
            }

            const response = await axios.post('https://bk-tonita.onrender.com/api/publications', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Adopción publicada:', response.data);
            alert('¡Mascota publicada para adopción!');
            setFormulario({ title: '', description: '', edad: '' });
            setImagenArchivo(null);

        } catch (error) {
            console.error('Error al publicar adopción:', error.response?.data || error.message);
            alert('Error al publicar adopción');
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
                placeholder="Nombre de la mascota"
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
                name="edad"
                value={formulario.edad}
                onChange={handleChange}
                required
                placeholder="Edad (años)"
                className="w-full p-2 border rounded"
            />

            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => setImagenArchivo(e.target.files[0])}
                className="w-full p-2 border rounded"
            />

            <button type="submit" className="bg-purple-600 text-white px-4 py-2 rounded">
                Publicar Adopción
            </button>
        </form>
    );
};

export default FormularioAdopcion;
