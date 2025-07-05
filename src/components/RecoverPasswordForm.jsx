import React, { useState } from 'react';
import { FaEnvelope, FaPaw } from 'react-icons/fa';

const RecoverPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email) {
            setError('Por favor, ingresa tu correo electrónico');
            return;
        }

        // Simulación de envío (puedes reemplazar luego con axios.post)
        setMensaje('Si el correo existe, recibirás instrucciones 🐱');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {mensaje && <p className="text-green-700 text-sm">{mensaje}</p>}

            <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                </span>
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    className="pl-10 p-3 border rounded-lg w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-bold flex items-center justify-center gap-2"
            >
                <FaPaw /> Recuperar contraseña
            </button>
        </form>
    );
};

export default RecoverPasswordForm;
