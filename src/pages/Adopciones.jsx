import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';
import { useAuth } from '../context/AuthContext';

const Adopciones = () => {
    const { token } = useAuth();
    const [busqueda, setBusqueda] = useState('');
    const [itemSeleccionado, setItemSeleccionado] = useState(null);
    const [adopciones, setAdopciones] = useState([]);

    useEffect(() => {
        const obtenerAdopciones = async () => {
            try {
                const res = await axios.get('https://bk-tonita.onrender.com/api/publications', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const publicaciones = res.data.publications || [];

                const adopcionesFiltradas = publicaciones
                    .filter(pub => pub.category_id === 3)
                    .sort((a, b) => b.id_publication - a.id_publication); // más recientes primero

                setAdopciones(adopcionesFiltradas);
            } catch (error) {
                console.error('Error al obtener adopciones:', error);
            }
        };

        obtenerAdopciones();
    }, [token]);

    const filtradas = adopciones.filter((item) =>
        item.title_publication.toLowerCase().includes(busqueda.toLowerCase()) ||
        item.description_publication.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-green-700 mb-4">Adopciones</h1>

            <input
                type="text"
                placeholder="Buscar adopciones..."
                className="w-full mb-6 px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring focus:ring-green-200"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtradas.map((item) => (
                    <ItemCard key={item.id_publication} item={item} onClick={setItemSeleccionado} />
                ))}
            </div>

            {itemSeleccionado && (
                <ItemModal item={itemSeleccionado} onClose={() => setItemSeleccionado(null)} />
            )}
        </div>
    );
};

export default Adopciones;
