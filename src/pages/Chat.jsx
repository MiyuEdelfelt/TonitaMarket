import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';

const Chat = () => {
    const { usuarioAutenticado } = useAuth();
    const location = useLocation();
    const datosDesdeItem = location.state || {};

    const [mensaje, setMensaje] = useState('');
    const [conversacion, setConversacion] = useState([]);
    const [contactos, setContactos] = useState([]);
    const [contactoActivo, setContactoActivo] = useState(null);

    // Cargar inbox al iniciar
    useEffect(() => {
        if (!usuarioAutenticado) return;

        const fetchInbox = async () => {
            try {
                const res = await axios.get('https://bk-tonita.onrender.com/api/messages/inbox', {
                    headers: {
                        Authorization: `Bearer ${usuarioAutenticado.token}`,
                    },
                });

                const contactosFormateados = res.data.map((msg) => ({
                    id: msg.sender_id,
                    nombre: msg.sender_alias,
                    avatar: `https://i.pravatar.cc/150?u=${msg.sender_id}`,
                }));

                setContactos(contactosFormateados);

                // Si hay datos desde publicación, usar ese contacto
                if (datosDesdeItem?.id_usuario) {
                    const contacto = contactosFormateados.find(c => c.id === datosDesdeItem.id_usuario) ||
                    {
                        id: datosDesdeItem.id_usuario,
                        nombre: datosDesdeItem.nombre,
                        avatar: `https://i.pravatar.cc/150?u=${datosDesdeItem.id_usuario}`,
                    };
                    setContactoActivo(contacto);
                    cargarConversacion(contacto.id);
                }
            } catch (error) {
                console.error('Error cargando inbox:', error);
                alert('No se pudo cargar tus mensajes');
            }
        };

        fetchInbox();
    }, [usuarioAutenticado, datosDesdeItem]);

    const cargarConversacion = async (receptorId) => {
        try {
            const res = await axios.get(`https://bk-tonita.onrender.com/api/messages/history/${receptorId}`, {
                headers: {
                    Authorization: `Bearer ${usuarioAutenticado.token}`,
                },
            });

            setConversacion(
                res.data.map((m) => ({
                    id: m.id_message,
                    emisor: m.sender_id === usuarioAutenticado.id_user ? 'yo' : 'otro',
                    texto: m.message,
                }))
            );
        } catch (error) {
            console.error('Error cargando conversación:', error);
            alert('No se pudo cargar la conversación');
        }
    };

    const enviarMensaje = async () => {
        if (!mensaje.trim() || !contactoActivo) return;

        try {
            await axios.post(
                'https://bk-tonita.onrender.com/api/messages',
                {
                    receiver_id: contactoActivo.id,
                    message: mensaje,
                },
                {
                    headers: {
                        Authorization: `Bearer ${usuarioAutenticado.token}`,
                    },
                }
            );

            setConversacion((prev) => [
                ...prev,
                { id: Date.now(), emisor: 'yo', texto: mensaje },
            ]);
            setMensaje('');
        } catch (error) {
            console.error('Error enviando mensaje:', error);
            alert('No se pudo enviar el mensaje');
        }
    };

    return (
        <div className="flex h-[calc(100vh-64px)] bg-green-50 overflow-hidden">
            {/* Lista de contactos */}
            <div className="w-[25%] bg-green-100 border-r border-green-200 p-4 hidden md:flex flex-col">
                <h2 className="text-lg font-bold text-green-800 mb-4">Mensajes</h2>
                <div className="space-y-2 overflow-y-auto">
                    {contactos.map((contacto) => (
                        <div
                            key={contacto.id}
                            className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${contactoActivo?.id === contacto.id
                                ? 'bg-green-200'
                                : 'hover:bg-green-50'
                                }`}
                            onClick={() => {
                                setContactoActivo(contacto);
                                cargarConversacion(contacto.id);
                            }}
                        >
                            <img
                                src={contacto.avatar}
                                alt={contacto.nombre}
                                className="w-10 h-10 rounded-full object-cover border border-green-300"
                            />
                            <p className="font-semibold text-green-800 text-sm">{contacto.nombre}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat principal */}
            <div className="flex-1 flex flex-col">
                {contactoActivo ? (
                    <>
                        {/* Cabecera */}
                        <div className="bg-green-200 px-6 py-3 border-b border-green-300 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={contactoActivo.avatar}
                                    alt={contactoActivo.nombre}
                                    className="w-10 h-10 rounded-full object-cover border border-green-400"
                                />
                                <div>
                                    <p className="font-bold text-green-800">{contactoActivo.nombre}</p>
                                </div>
                            </div>
                            <FiMoreVertical className="text-green-800 text-xl cursor-pointer" />
                        </div>

                        {/* Conversación */}
                        <div className="flex-1 overflow-y-auto px-4 py-2 bg-green-50 space-y-3">
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

                        {/* Input */}
                        <div className="sticky bottom-0 left-0 w-full p-4 border-t border-green-200 bg-white flex items-center gap-2">
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
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-green-700">
                        <p className="text-lg font-semibold">Selecciona un contacto para comenzar a chatear</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
