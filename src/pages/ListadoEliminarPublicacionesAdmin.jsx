import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListadoEliminarPublicacionesAdmin = () => {
    const [publicaciones, setPublicaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [idAEliminar, setIdAEliminar] = useState(null);
    const [mensajeExito, setMensajeExito] = useState('');

    const userData = JSON.parse(localStorage.getItem('usuarioToñita'));
    const token = userData?.token || null;

    useEffect(() => {
        const fetchMisPublicaciones = async () => {
            if (!token) {
                console.warn("⚠️ No se encontró el token. Asegúrate de estar logueado.");
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get('https://bk-tonita.onrender.com/api/publications/admin', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setPublicaciones(res.data.publications || []);
            } catch (error) {
                console.error('Error al cargar publicaciones:', error);
                setPublicaciones([]);
            } finally {
                setLoading(false);
            }
        };

        fetchMisPublicaciones();
    }, [token]);

    const eliminarPublicacion = async () => {
        try {
            await axios.delete(`https://bk-tonita.onrender.com/api/publications/${idAEliminar}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setPublicaciones(publicaciones.filter(pub => pub.id_publication !== idAEliminar));
            setMensajeExito('Publicación eliminada correctamente.');
            setTimeout(() => setMensajeExito(''), 3000);
        } catch (error) {
            console.error('Error al eliminar publicación:', error);
            alert('No se pudo eliminar la publicación.');
        } finally {
            setIdAEliminar(null);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto relative">
            <h1 className="text-2xl font-bold text-red-800 mb-4">Publicaciones de todos los usuarios</h1>


            {/* ✅ TOAST FLOTANTE */}
            {mensajeExito && (
                <div className="fixed top-4 right-4 z-50 bg-green-100 text-green-800 border border-green-400 px-4 py-2 rounded shadow-lg animate-fade-in">
                    ✅ {mensajeExito}
                </div>
            )}

            {loading ? (
                <p className="text-gray-600">Cargando publicaciones...</p>
            ) : publicaciones.length === 0 ? (
                <p className="text-gray-600">No tienes publicaciones aún.</p>
            ) : (
                <ul className="space-y-4">
                    {publicaciones.map((pub) => (
                        <li key={pub.id_publication} className="flex items-center justify-between border p-4 rounded shadow">
                            <div>
                                <h3 className="text-lg font-semibold">
                                    {pub.title_publication} <span className="text-sm text-gray-500">(por {pub.user_name})</span>
                                </h3>

                                <p className="text-sm text-gray-600">{pub.description_publication}</p>
                            </div>
                            <button
                                onClick={() => setIdAEliminar(pub.id_publication)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold"
                            >
                                ❌ Eliminar
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {/* ✅ MODAL DIFUMINADO */}
            {idAEliminar && (
                <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-white/10 z-50">
                    <div className="bg-white p-6 rounded shadow-md text-center max-w-sm">
                        <h2 className="text-lg font-semibold mb-4">¿Estás seguro?</h2>
                        <p className="text-sm text-gray-700 mb-6">Esta acción no se puede deshacer.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setIdAEliminar(null)}
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={eliminarPublicacion}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded font-bold"
                            >
                                Sí, eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListadoEliminarPublicacionesAdmin;
