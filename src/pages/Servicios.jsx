import React, { useState, useEffect } from 'react';
import CardItem from '../components/ItemCard';
import ItemModal from '../components/ItemModal';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Servicios = () => {
    const { token } = useAuth();
    const [busqueda, setBusqueda] = useState('');
    const [itemSeleccionado, setItemSeleccionado] = useState(null);
    const [servicios, setServicios] = useState([]);

    useEffect(() => {
        const obtenerServicios = async () => {
            try {
                const response = await axios.get('https://bk-tonita.onrender.com/api/publications', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const publicaciones = response.data.publications || [];

                const serviciosFiltrados = publicaciones.filter(pub => pub.category_id === 2);
                setServicios(serviciosFiltrados);
            } catch (error) {
                console.error('Error al obtener servicios desde el backend:', error);
            }
        };

        obtenerServicios();
    }, [token]);

    const serviciosFiltrados = servicios.filter(item =>
        item.title_publication.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.description_publication.toLowerCase().includes(busqueda.toLowerCase())
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
                {serviciosFiltrados.map(item => (
                    <CardItem key={item.id_publication} item={item} onClick={setItemSeleccionado} />
                ))}
            </div>

            {itemSeleccionado && (
                <ItemModal item={itemSeleccionado} onClose={() => setItemSeleccionado(null)} />
            )}
        </div>
    );
};

export default Servicios;
