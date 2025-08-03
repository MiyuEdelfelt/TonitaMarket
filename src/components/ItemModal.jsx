import React, { useEffect, useRef, useState } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ItemModal = ({ item, onClose }) => {
    const modalRef = useRef(null);
    const { agregarAlCarrito } = useCarrito();
    const [mostrarContacto, setMostrarContacto] = useState(false);
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

    const tipo =
        item.category_id === 1
            ? 'producto'
            : item.category_id === 2
                ? 'servicio'
                : 'adopcion';

    const imagenUrl = item.image_publication.startsWith('/uploads/')
        ? `https://bk-tonita.onrender.com${item.image_publication}`
        : `https://bk-tonita.onrender.com/uploads/${item.image_publication}`;

    const handleAgregarAlCarrito = async () => {
        try {
            const usuarioGuardado = localStorage.getItem('usuarioToñita');
            if (!usuarioGuardado) {
                alert('Debes iniciar sesión para agregar al carrito.');
                return;
            }

            const usuario = JSON.parse(usuarioGuardado);
            const token = usuario.token;

            const response = await axios.post(
                'https://bk-tonita.onrender.com/api/cart',
                { publication_id: item.id_publication },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log('Item agregado al carrito:', response.data);
            agregarAlCarrito(item);
            onClose();
        } catch (error) {
            console.error('Error al agregar al carrito:', error);
            alert('Hubo un problema al agregar el producto al carrito.');
        }
    };

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
                    src={imagenUrl}
                    alt={item.title_publication}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h2 className="text-2xl font-bold text-green-800 mb-2">{item.title_publication}</h2>
                <p className="text-gray-600 mb-2">{item.description_publication}</p>
                <p className="text-sm text-gray-500 mb-4">
                    Categoría: {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </p>

                {tipo === 'producto' ? (
                    <>
                        <p className="text-xl font-semibold text-green-700 mb-4">
                            ${item.price_publication?.toLocaleString()}
                        </p>
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
                            onClick={handleAgregarAlCarrito}
                        >
                            Agregar al carrito
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                            onClick={() => setMostrarContacto(true)}
                        >
                            Solicitar
                        </button>

                        {/* Modal de contacto */}
                        {mostrarContacto && (
                            <div className="mt-4 p-4 border rounded-lg bg-blue-50 text-blue-900">
                                <p><strong>Correo:</strong> {item.email_cat}</p>
                                <p><strong>Teléfono:</strong> {item.phone_cat}</p>
                                <button
                                    className="mt-2 text-sm text-blue-600 underline"
                                    onClick={() => setMostrarContacto(false)}
                                >
                                    Ocultar contacto
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default ItemModal;
