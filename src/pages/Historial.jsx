import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Historial = () => {
    const [datos, setDatos] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const usuarioString = localStorage.getItem('usuarioToñita');
                const usuario = usuarioString ? JSON.parse(usuarioString) : null;
                if (!usuario || !usuario.token) {
                    alert('Debes iniciar sesión para ver el historial');
                    return;
                }

                const response = await axios.get('https://bk-tonita.onrender.com/api/sales/history', {
                    headers: {
                        Authorization: `Bearer ${usuario.token}`
                    }
                });

                const historialAdaptado = response.data.map((item) => {
                    const categoria = Number(item.category_id);
                    let tipo = 'adopcion';

                    if (categoria === 1) tipo = 'producto';
                    else if (categoria === 2) tipo = 'servicio';
                    else if (categoria === 3) tipo = 'adopcion';

                    return {
                        id: item.id || item.publication_id || Math.random(),
                        tipo,
                        nombre: item.title_publication || item.nombre || 'Sin nombre',
                        descripcion: item.description_publication || item.descripcion || 'Sin descripción',
                        imagen: item.image_publication?.startsWith('/uploads/')
                            ? `https://bk-tonita.onrender.com${item.image_publication}`
                            : `https://bk-tonita.onrender.com/uploads/${item.image_publication}`,
                        fecha: item.sale_date
                            ? new Date(item.sale_date).toLocaleDateString('es-CL', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                              })
                            : 'Fecha desconocida'
                    };
                });

                setDatos(historialAdaptado);
            } catch (error) {
                console.error('Error al obtener historial:', error);
            }
        };

        fetchHistorial();
    }, []);

    const resultados = datos.filter(item =>
        item.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
        (filtro === '' || item.tipo === filtro)
    );

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">📜 Historial de Actividad</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full md:w-1/2 p-2 border rounded"
                />
                <select
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                    className="w-full md:w-1/4 p-2 border rounded"
                >
                    <option value="">Todos</option>
                    <option value="producto">Productos</option>
                    <option value="servicio">Servicios</option>
                    <option value="adopcion">Adopciones</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {resultados.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-lg shadow p-4 flex flex-col transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                    >
                        <img src={item.imagen} alt={item.nombre} className="h-40 object-cover rounded mb-4" />
                        <h3 className="text-xl font-semibold">{item.nombre}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.descripcion}</p>
                        <span className="text-xs text-gray-400 mt-auto">📅 {item.fecha}</span>
                        <span className="text-xs bg-gray-100 mt-2 inline-block px-2 py-1 rounded text-gray-700">
                            {item.tipo.toUpperCase()}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Historial;
