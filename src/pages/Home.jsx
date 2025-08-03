import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';

const Home = () => {
    const [items, setItems] = useState([]);
    const [filtro, setFiltro] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [itemSeleccionado, setItemSeleccionado] = useState(null);

    useEffect(() => {
        axios.get('https://bk-tonita.onrender.com/api/publications') // ✅ Traer todas las publicaciones
            .then(res => {
                console.log('Datos desde backend:', res.data);
                setItems(res.data.publications);
            })
            .catch(err => {
                console.error('Error al cargar publicaciones:', err);
            });
    }, []);

    const filtrados = Array.isArray(items)
        ? items.filter(item =>
            item.title_publication.toLowerCase().includes(busqueda.toLowerCase()) &&
            (filtro === '' || (
                (filtro === 'producto' && item.category_id === 1) ||
                (filtro === 'servicio' && item.category_id === 2)
            ))
        )
        : [];

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
                    <ItemCard key={item.id_publication} item={item} onClick={setItemSeleccionado} />
                ))}
            </div>

            {itemSeleccionado && (
                <ItemModal item={itemSeleccionado} onClose={() => setItemSeleccionado(null)} />
            )}
        </div>
    );
};

export default Home;
