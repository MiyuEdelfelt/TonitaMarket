import React, { useState } from 'react';
import axios from 'axios';

const EditarPublicacion = ({ publicacion, onClose, onUpdateSuccess }) => {
    const [title, setTitle] = useState(publicacion.title_publication || '');
    const [description, setDescription] = useState(publicacion.description_publication || '');
    const [price, setPrice] = useState(publicacion.price_publication || '');
    const [categoryId, setCategoryId] = useState(publicacion.category_id || '');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('categoryId', categoryId);
            if (image) formData.append('image', image);

            const token = localStorage.getItem('token'); // O donde lo tengas guardado

            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/publications/${publicacion.id_publication}`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            onUpdateSuccess(); // Para recargar datos si es necesario
            onClose(); // Cierra el modal o el componente
        } catch (error) {
            console.error('Error al actualizar publicación:', error);
            alert('Hubo un error al actualizar la publicación.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-md max-w-lg mx-auto">
            <h2 className="text-xl font-bold mb-4">Editar Publicación</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className="w-full mb-2 p-2 border rounded"
                    type="text"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <input
                    className="w-full mb-2 p-2 border rounded"
                    type="number"
                    placeholder="Precio"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
                <input
                    className="w-full mb-2 p-2 border rounded"
                    type="number"
                    placeholder="ID Categoría"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                />
                <input
                    className="w-full mb-4"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        disabled={loading}
                    >
                        {loading ? 'Actualizando...' : 'Guardar Cambios'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-600 underline"
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditarPublicacion;
