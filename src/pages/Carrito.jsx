// src/pages/Carrito.jsx

import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

const Carrito = () => {
    const { carrito, eliminarDelCarrito, limpiarCarrito } = useCarrito();

    const total = carrito.reduce((acc, item) => acc + Number(item.price_publication || 0), 0);

    const finalizarCompra = async () => {
        if (carrito.length === 0) return;

        const usuarioToñitaStr = localStorage.getItem('usuarioToñita');
        if (!usuarioToñitaStr) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No estás autenticado. Por favor inicia sesión.',
            });
        }

        let token;
        try {
            const usuarioToñita = JSON.parse(usuarioToñitaStr);
            token = usuarioToñita.token;
        } catch (error) {
            console.error('Error al parsear usuarioToñita:', error);
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Sesión inválida. Vuelve a iniciar sesión.',
            });
        }

        if (!token) {
            return Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Token no encontrado. Inicia sesión nuevamente.',
            });
        }

        try {
            const response = await axios.post(
                'https://bk-tonita.onrender.com/api/checkout',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            limpiarCarrito();

            await Swal.fire({
                icon: 'success',
                title: '¡Compra realizada con éxito! 🐾',
                text: 'Gracias por tu compra. Para más detalles puedes contactar al publicador.',
            });

        } catch (error) {
            console.error('Error al finalizar compra:', error);

            let mensaje = 'Hubo un problema al realizar la compra.';
            if (error.response?.status === 403) {
                mensaje = 'Token inválido o sesión expirada.';
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: mensaje,
            });
        }
    };

    const getImagenUrl = (img) => {
        if (!img) return '/placeholder.jpg';
        return img.startsWith('/uploads/')
            ? `https://bk-tonita.onrender.com${img}`
            : `https://bk-tonita.onrender.com/uploads/${img}`;
    };

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-green-800 mb-6">🛒 Tu carrito</h1>

            {carrito.length === 0 ? (
                <p className="text-gray-600">
                    Tu carrito está vacío.{' '}
                    <Link to="/" className="text-green-600 underline">Explora productos</Link>.
                </p>
            ) : (
                <>
                    <ul className="space-y-4 mb-6">
                        {carrito.map((item, index) => (
                            <li key={index} className="flex items-center justify-between bg-white p-4 rounded-xl shadow">
                                <div className="flex items-center gap-4">
                                    <img
                                        src={getImagenUrl(item.image_publication)}
                                        alt={item.title_publication}
                                        className="w-16 h-16 object-cover rounded-md"
                                    />
                                    <div>
                                        <h2 className="text-lg font-semibold text-green-800">{item.title_publication}</h2>
                                        <p className="text-gray-500 text-sm">
                                            ${Number(item.price_publication).toLocaleString('es-CL')}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => eliminarDelCarrito(item.id_publication)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="text-right mb-6">
                        <p className="text-xl font-bold text-green-800">
                            Total: ${total.toLocaleString('es-CL')}
                        </p>
                    </div>

                    <div className="flex justify-between">
                        <button
                            onClick={limpiarCarrito}
                            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                        >
                            Vaciar carrito
                        </button>
                        <button
                            onClick={finalizarCompra}
                            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                        >
                            Finalizar compra
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Carrito;
