import React from 'react';
import RecoverPasswordForm from '../components/RecoverPasswordForm';

const RecoverPassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 to-green-400">
            <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-sm border border-white/40">
                <h2 className="text-2xl font-bold text-center text-green-800 mb-4">Recuperar Contraseña</h2>
                <RecoverPasswordForm />
            </div>
        </div>
    );
};

export default RecoverPassword;
