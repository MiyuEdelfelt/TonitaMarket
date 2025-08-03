import React from 'react';
import axios from 'axios';

const EliminarPublicacion = ({ publicacionId, onDeleteSuccess, onCancel }) => {
    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');

            await axios.delete(
                `http://localhost:3000/api/publications/${publicacionId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            alert('Publicación eliminada exitosamente');
            onDeleteSuccess(); // Para actualizar la vista si es necesario
        } catch (error) {
            console.error('Error al eliminar publicación:', error);
            alert('Hubo un error al eliminar la publicación');
        }
    };

    return (
        <div className="bg-white p-6 rounded shadow-md max-w-md mx-auto text-center">
            <h2 className="text-lg font-semibold mb-4">¿Estás seguro?</h2>
            <p className="mb-6">Esta acción eliminará la publicación de forma lógica (no se perderá de la base de datos, pero no será visible).</p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={handleDelete}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                    Eliminar
                </button>
                <button
                    onClick={onCancel}
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default EliminarPublicacion;
