import React, { useEffect, useState } from 'react';
import CardItem from '../components/ItemCard';
import ItemModal from '../components/ItemModal';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Productos = () => {
    const { token } = useAuth(); // Suponiendo que el token se guarda aquí
    const [busqueda, setBusqueda] = useState('');
    const [itemSeleccionado, setItemSeleccionado] = useState(null);
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const response = await axios.get('https://bk-tonita.onrender.com/api/publications', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const publicaciones = response.data.publications || [];

                const productosFiltrados = publicaciones.filter(pub => pub.category_id === 1);
                setProductos(productosFiltrados);
            } catch (error) {
                console.error('Error al obtener productos desde el backend:', error);
            }
        };

        obtenerProductos();
    }, [token]);

    const productosFiltrados = productos.filter(item =>
        item.title_publication.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.description_publication.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-green-700 mb-4">Productos para Gatitos</h1>
            <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar producto..."
                className="w-full p-2 border border-gray-300 rounded-md"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {productosFiltrados.map(item => (
                    <CardItem key={item.id_publication} item={item} onClick={setItemSeleccionado} />
                ))}
            </div>

            {/* Modal */}
            {itemSeleccionado && (
                <ItemModal item={itemSeleccionado} onClose={() => setItemSeleccionado(null)} />
            )}
        </div>
    );
};

export default Productos;
