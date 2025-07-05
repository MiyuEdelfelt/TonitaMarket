import React from 'react';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-200 via-green-300 to-green-400">
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-lg w-full max-w-md border border-white/40">
        <h2 className="text-2xl font-bold mb-6 text-center text-green-800">Iniciar Sesión</h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
