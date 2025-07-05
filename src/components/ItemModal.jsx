import React, { useEffect, useRef } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';

const ItemModal = ({ item, onClose }) => {
    const modalRef = useRef(null);
    const { agregarAlCarrito } = useCarrito();
    const navigate = useNavigate();

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [onClose]);

    if (!item) return null;

    return (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300">
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative animate-fadeIn"
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
                >
                    &times;
                </button>

                <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-2xl font-bold text-green-800 mb-2">{item.nombre}</h2>
                <p className="text-gray-600 mb-2">{item.descripcion}</p>
                <p className="text-sm text-gray-500 mb-4">Categoría: {item.categoria}</p>

                {item.tipo === 'producto' ? (
                    <>
                        <p className="text-xl font-semibold text-green-700 mb-4">
                            ${item.precio?.toLocaleString()}
                        </p>
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                            onClick={() => {
                                agregarAlCarrito(item);
                                onClose();
                            }}
                        >
                            Agregar al carrito
                        </button>
                    </>
                ) : (
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                        onClick={() => {
                            navigate('/chat', {
                                state: {
                                    id_usuario: item.id_usuario || null,
                                    nombre: item.nombre,
                                    tipo: item.tipo,
                                },
                            });
                            onClose();
                        }}
                    >
                        Solicitar
                    </button>
                )}
            </div>
        </div>
    );
};

export default ItemModal;
