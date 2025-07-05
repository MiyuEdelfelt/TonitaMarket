import React, { useState } from 'react';
import CardItem from '../components/ItemCard';
import ItemModal from '../components/ItemModal';
import data from '../data/items';

const Servicios = () => {
    const [busqueda, setBusqueda] = useState('');
    const [itemSeleccionado, setItemSeleccionado] = useState(null);

    const servicios = data.filter(item =>
        item.tipo === 'servicio' &&
        (item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
    );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-green-700 mb-4">Servicios para Gatitos</h1>
            <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar servicio..."
                className="w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {servicios.map(item => (
                    <CardItem key={item.id} item={item} onClick={setItemSeleccionado} />
                ))}
            </div>

            {/* Modal */}
            {itemSeleccionado && (
                <ItemModal item={itemSeleccionado} onClose={() => setItemSeleccionado(null)} />
            )}
        </div>
    );
};

export default Servicios;
