import React, { useState } from 'react';
import items from '../data/items';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';

const Explorar = () => {
    const [busqueda, setBusqueda] = useState('');
    const [itemSeleccionado, setItemSeleccionado] = useState(null);

    const filtrados = items.filter(item =>
        item.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-4 text-green-800">Explora todo el contenido</h1>

            <input
                type="text"
                placeholder="Buscar por nombre..."
                className="p-2 border border-gray-300 rounded-md w-full md:w-1/3 mb-6"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filtrados.map(item => (
                    <ItemCard key={item.id} item={item} onClick={setItemSeleccionado} />
                ))}
            </div>

            {itemSeleccionado && (
                <ItemModal item={itemSeleccionado} onClose={() => setItemSeleccionado(null)} />
            )}
        </div>
    );
};

export default Explorar;
