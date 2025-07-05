import React from 'react';
import { useCarrito } from '../context/CarritoContext';
import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Carrito = () => {
    const { carrito, eliminarDelCarrito, limpiarCarrito } = useCarrito();
    const navigate = useNavigate();

    const total = carrito.reduce((acc, item) => acc + (item.precio || 0), 0);

    const finalizarCompra = async () => {
        if (carrito.length === 0) return;

        // Simulación: obtener primer publicador de la compra
        const publicador = carrito[0];

        // Limpiar el carrito
        limpiarCarrito();

        // Mostrar mensaje con opción a ir al chat
        const resultado = await Swal.fire({
            icon: 'success',
            title: '¡Compra realizada con éxito! 🐾',
            text: 'Gracias por tu compra. Para más detalles puedes contactar al publicador.',
            showCancelButton: true,
            confirmButtonText: 'Ir al chat',
            cancelButtonText: 'OK',
            reverseButtons: true
        });

        if (resultado.isConfirmed) {
            navigate('/chat', {
                state: {
                    id_usuario: publicador.id_usuario || null,
                    nombre: publicador.nombre,
                    tipo: publicador.tipo,
                }
            });
        }
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
                                    <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded-md" />
                                    <div>
                                        <h2 className="text-lg font-semibold text-green-800">{item.nombre}</h2>
                                        <p className="text-gray-500 text-sm">${item.precio?.toLocaleString()}</p>
                                    </div>
                                </div>
                                <button onClick={() => eliminarDelCarrito(item.id)} className="text-red-600 hover:text-red-800">
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="text-right mb-6">
                        <p className="text-xl font-bold text-green-800">Total: ${total.toLocaleString()}</p>
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
