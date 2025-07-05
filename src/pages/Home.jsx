import React, { useState } from 'react';
import items from '../data/items';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';

const Home = () => {
    const [filtro, setFiltro] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [itemSeleccionado, setItemSeleccionado] = useState(null);

    const filtrados = items.filter(item =>
        item.nombre.toLowerCase().includes(busqueda.toLowerCase()) &&
        (filtro === '' || item.tipo === filtro)
    );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-green-800">Bienvenido a Tonita Market</h1>

            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    className="p-2 border border-gray-300 rounded-md w-full md:w-1/3"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                />
                <select
                    className="p-2 border border-gray-300 rounded-md w-full md:w-1/4"
                    value={filtro}
                    onChange={e => setFiltro(e.target.value)}
                >
                    <option value="">Todos</option>
                    <option value="producto">Productos</option>
                    <option value="servicio">Servicios</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filtrados.map(item => (
                    <ItemCard key={item.id} item={item} onClick={setItemSeleccionado} />
                ))}
            </div>

            {/* Modal */}
            {itemSeleccionado && (
                <ItemModal item={itemSeleccionado} onClose={() => setItemSeleccionado(null)} />
            )}
        </div>
    );
};

export default Home;
