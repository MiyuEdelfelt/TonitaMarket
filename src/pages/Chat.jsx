import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaPaperPlane } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';

const Chat = () => {
    const { usuarioAutenticado } = useAuth();
    const location = useLocation();
    const datosDesdeItem = location.state || {};

    const [mensaje, setMensaje] = useState('');
    const [escribiendo, setEscribiendo] = useState(false);
    const [conversacion, setConversacion] = useState([
        { id: 1, emisor: 'otro', texto: 'Hola, ¿en qué te puedo ayudar?' },
        { id: 2, emisor: 'yo', texto: 'Hola, me interesa tu servicio.' },
    ]);

    const contactosFijos = [
        { id: 1, nombre: 'Juan Servicios', avatar: 'https://i.pravatar.cc/150?img=11' },
        { id: 2, nombre: 'Adopciones Anita', avatar: 'https://i.pravatar.cc/150?img=12' },
        { id: 3, nombre: 'Tienda Gatuna', avatar: 'https://i.pravatar.cc/150?img=13' },
    ];

    const [contactos, setContactos] = useState(contactosFijos);
    const [contactoActivo, setContactoActivo] = useState(contactosFijos[0]);

    // Si viene desde una card (producto, servicio o adopción)
    useEffect(() => {
        if (datosDesdeItem.nombre) {
            const nuevoContacto = {
                id: Date.now(),
                nombre: datosDesdeItem.nombre,
                avatar: `https://i.pravatar.cc/150?u=${Date.now()}`,
            };
            setContactos((prev) => [...prev, nuevoContacto]);
            setContactoActivo(nuevoContacto);
        }
    }, [datosDesdeItem]);

    const enviarMensaje = () => {
        if (!mensaje.trim()) return;

        setConversacion((prev) => [
            ...prev,
            { id: Date.now(), emisor: 'yo', texto: mensaje },
        ]);
        setMensaje('');
        simularRespuesta();
    };

    const simularRespuesta = () => {
        setEscribiendo(true);
        setTimeout(() => {
            setConversacion((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    emisor: 'otro',
                    texto: 'Gracias por escribir, te responderé pronto.',
                },
            ]);
            setEscribiendo(false);
        }, 2000);
    };

    return (
        <div className="flex min-h-screen bg-green-50">
            {/* Panel izquierdo: Lista de chats */}
            <div className="w-[25%] bg-green-100 border-r border-green-200 p-4 hidden md:flex flex-col">
                <h2 className="text-lg font-bold text-green-800 mb-4">Mensajes</h2>
                <div className="space-y-2 overflow-y-auto">
                    {contactos.map((contacto) => (
                        <div
                            key={contacto.id}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${contacto.id === contactoActivo.id
                                ? 'bg-green-200'
                                : 'hover:bg-green-50'
                                }`}
                            onClick={() => setContactoActivo(contacto)}
                        >
                            <img
                                src={contacto.avatar}
                                alt={contacto.nombre}
                                className="w-10 h-10 rounded-full object-cover border border-green-300"
                            />
                            <div>
                                <p className="font-semibold text-green-800 text-sm">{contacto.nombre}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Panel derecho: Chat actual */}
            <div className="flex-1 flex flex-col">
                {/* Cabecera del chat */}
                <div className="bg-green-200 px-6 py-3 border-b border-green-300 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src={contactoActivo.avatar}
                            alt={contactoActivo.nombre}
                            className="w-10 h-10 rounded-full object-cover border border-green-400"
                        />
                        <div>
                            <p className="font-bold text-green-800">{contactoActivo.nombre}</p>
                            {escribiendo && (
                                <p className="text-green-600 text-sm animate-pulse">Escribiendo...</p>
                            )}
                        </div>
                    </div>
                    <FiMoreVertical className="text-green-800 text-xl cursor-pointer" />
                </div>

                {/* Cuerpo del chat */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-green-50">
                    {conversacion.map((msg) => (
                        <div
                            key={msg.id}
                            className={`max-w-[70%] px-4 py-2 rounded-xl text-sm ${msg.emisor === 'yo'
                                ? 'bg-green-400 text-white self-end ml-auto'
                                : 'bg-white border border-green-200 text-green-800 self-start'
                                }`}
                        >
                            {msg.texto}
                        </div>
                    ))}
                </div>

                {/* Input para escribir mensaje */}
                <div className="p-4 border-t border-green-200 bg-white flex items-center gap-2">
                    <input
                        type="text"
                        className="flex-1 rounded-lg px-4 py-2 border border-green-300 focus:outline-none focus:ring focus:ring-green-200"
                        placeholder="Escribe un mensaje..."
                        value={mensaje}
                        onChange={(e) => setMensaje(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && enviarMensaje()}
                    />
                    <button
                        onClick={enviarMensaje}
                        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
