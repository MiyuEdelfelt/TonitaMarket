import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EliminarPublicacionPage = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [eliminandoId, setEliminandoId] = useState(null);
    const token = localStorage.getItem('token');

    const fetchPublicaciones = async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/publications/mine`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPublicaciones(res.data);
        } catch (error) {
            console.error('Error al obtener publicaciones', error);
            alert('Error al obtener publicaciones');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPublicaciones();
    }, []);

    const handleEliminar = async (id) => {
        const confirmar = window.confirm('¿Estás seguro de eliminar esta publicación?');
        if (!confirmar) return;

        try {
            setEliminandoId(id);
            await axios.delete(`http://localhost:3000/api/publications/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Publicación eliminada correctamente');
            fetchPublicaciones(); // refresca el listado
        } catch (error) {
            console.error('Error al eliminar publicación', error);
            alert('Error al eliminar publicación');
        } finally {
            setEliminandoId(null);
        }
    };

    if (loading) return <p className="text-center mt-10">Cargando publicaciones...</p>;

    if (publicaciones.length === 0)
        return <p className="text-center mt-10">No tienes publicaciones para eliminar.</p>;

    return (
        <div className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Mis Publicaciones</h2>
            <ul className="space-y-4">
                {publicaciones.map((pub) => (
                    <li
                        key={pub.id_publication}
                        className="border rounded p-4 flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold">{pub.title_publication}</p>
                            <p className="text-sm text-gray-600">{pub.description_publication}</p>
                        </div>
                        <button
                            onClick={() => handleEliminar(pub.id_publication)}
                            disabled={eliminandoId === pub.id_publication}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            {eliminandoId === pub.id_publication ? 'Eliminando...' : 'Eliminar'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EliminarPublicacionPage;
