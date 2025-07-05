import React, { useState } from 'react';

const datosSimulados = [
    {
        id: 1,
        tipo: 'producto',
        nombre: 'Arena para gato',
        descripcion: 'Arena absorbente premium 10kg',
        imagen: '/img/producto1.jpg',
        fecha: '2025-07-04'
    },
    {
        id: 2,
        tipo: 'servicio',
        nombre: 'Baño felino a domicilio',
        descripcion: 'Baño y cepillado profesional',
        imagen: '/img/gato1.png',
        fecha: '2025-07-03'
    },
    {
        id: 3,
        tipo: 'adopcion',
        nombre: 'Michito',
        descripcion: 'Gatito de 2 meses busca hogar',
        imagen: '/img/adopcion1.jpg',
        fecha: '2025-07-01'
    },
];

const Historial = () => {
    const [busqueda, setBusqueda] = useState('');
    const [filtro, setFiltro] = useState('');

    const resultados = datosSimulados.filter(item =>
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
