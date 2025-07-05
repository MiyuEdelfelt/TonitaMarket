import { useState } from 'react';
import ItemCard from '../components/ItemCard';
import ItemModal from '../components/ItemModal';

const Adopciones = () => {
    const [busqueda, setBusqueda] = useState('');
    const [itemSeleccionado, setItemSeleccionado] = useState(null);

    const adopciones = [
        {
            id: 3,
            nombre: 'Bigotes',
            descripcion: 'Gato negro, ideal para compañía. Desparasitado.',
            categoria: 'gato joven',
            imagen: '/img/gato1.png',
            tipo: 'adopcion',
            id_usuario: 103,
        },
        {
            id: 2,
            nombre: 'Pelusa',
            descripcion: 'Gatita blanca, tranquila y esterilizada.',
            categoria: 'gata adulta',
            imagen: '/img/gato2.png',
            tipo: 'adopcion',
            id_usuario: 102,
        },
        {
            id: 1,
            nombre: 'Mishito',
            descripcion: 'Gatito rescatado, muy juguetón y sociable.',
            categoria: 'gatito bebé',
            imagen: '/img/gato3.png',
            tipo: 'adopcion',
            id_usuario: 101,
        },
    ];

    const filtradas = adopciones
        .filter((item) =>
            item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
            item.categoria.toLowerCase().includes(busqueda.toLowerCase())
        )
        .sort((a, b) => b.id - a.id); // Más reciente a más antigua

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
                    <ItemCard key={item.id} item={item} onClick={setItemSeleccionado} />
                ))}
            </div>

            {itemSeleccionado && (
                <ItemModal item={itemSeleccionado} onClose={() => setItemSeleccionado(null)} />
            )}
        </div>
    );
};

export default Adopciones;
