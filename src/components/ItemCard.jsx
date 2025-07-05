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

    return (
        <div
            onClick={handleClick}
            className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
        >
            <img
                src={item.imagen}
                alt={item.nombre}
                className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-4 flex flex-col justify-between h-full">
                <div>
                    <h3 className="text-lg font-bold text-green-800">{item.nombre}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.descripcion}</p>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block mb-2">
                        {item.tipo?.toUpperCase()} - {item.categoria}
                    </span>
                </div>
                <p className="text-xs text-gray-500 italic mt-2">
                    {item.tipo === 'producto'
                        ? 'Haz clic para ver y comprar'
                        : item.tipo === 'adopcion'
                            ? '* Haz clic para solicitar adopción'
                            : '* Haz clic para contactar al publicador'}
                </p>
            </div>
        </div>
    );
};

export default ItemCard;
