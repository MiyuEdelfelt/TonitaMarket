import React from 'react';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const ItemCard = ({ item, onClick }) => {
    const { usuarioAutenticado } = useAuth();

    const handleClick = () => {
        if (!usuarioAutenticado) {
            Swal.fire({
                icon: 'info',
                title: 'Inicia sesión',
                text: 'Debes iniciar sesión para interactuar con productos, servicios o adopciones.',
                confirmButtonText: 'Ir al login'
            }).then(result => {
                if (result.isConfirmed) {
                    window.location.href = '/login';
                }
            });
        } else {
            onClick(item);
        }
    };

    // Determinar el tipo basado en el category_id
    const tipo =
        item.category_id === 1
            ? 'producto'
            : item.category_id === 2
                ? 'servicio'
                : 'adopcion';

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
            <img
                src={`https://bk-tonita.onrender.com${item.image_publication}`}
                alt={item.title_publication}
                className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-4 flex flex-col justify-between h-full">
                <div>
                    <h3 className="text-lg font-bold text-green-800">{item.title_publication}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description_publication}</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block mb-2">
                        {tipo.toUpperCase()} - ID Cat: {item.category_id}
                    </span>
                </div>
                <p className="text-xs text-gray-500 italic mt-2">
                    {tipo === 'producto'
                        ? 'Haz clic para ver y comprar'
                        : tipo === 'adopcion'
                            ? '* Haz clic para solicitar adopción'
                            : '* Haz clic para contactar al publicador'}
                </p>
            </div>
        </div>
    );
};

export default ItemCard;
