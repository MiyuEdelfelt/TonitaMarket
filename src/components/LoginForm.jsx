import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaPaw, FaCat } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Simula login ficticio sin backend
        if (email === 'gatito@mail.com' && pass === 'gatoconbotas') {
            const usuarioSimulado = {
                nombre: 'Gatito',
                rol: 'normal_cat',
                email: email,
                token: 'gatitotoken123'
            };

            localStorage.setItem('usuarioToñita', JSON.stringify(usuarioSimulado));
            login(); // actualiza el estado del contexto
            setError('');
            window.location.href = '/'; // redirige
        } else {
            setError('Credenciales incorrectas');
        }
    };

    return (
        <div className="flex flex-col gap-4 items-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm">
                {error && <p className="text-red-500 text-sm">{error}</p>}

                <input
                    type="email"
                    placeholder="Correo electrónico o alias"
                    className="p-3 border rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className="relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Contraseña"
                        className="p-3 border rounded-lg w-full pr-10"
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-bold"
                >
                    Ingresar
                </button>
            </form>

            <div className="text-sm text-center mt-4">
                <a href="/recuperar" className="flex items-center justify-center text-green-700 hover:underline gap-2 mb-2">
                    <FaPaw /> ¿Olvidaste tu contraseña?
                </a>
                <div className="flex items-center justify-center gap-1 text-gray-700">
                    <span>¿No estás registrado?</span>
                    <a href="/registro" className="flex items-center gap-1 text-green-700 hover:underline font-semibold">
                        <FaCat /> Regístrate aquí
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
