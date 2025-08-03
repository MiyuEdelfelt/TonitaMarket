import { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
    const [form, setForm] = useState({
        name_cat: '',
        last_name_cat: '',
        alias_cat: '',
        email_cat: '',
        pass_cat: '',
        phone_cat: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // 👇 Convertimos los campos a los que espera el backend
        const datosAEnviar = {
            name: form.name_cat,
            lastName: form.last_name_cat,
            alias: form.alias_cat,
            email: form.email_cat,
            password: form.pass_cat,
            phone: form.phone_cat || 'Sin número',
            roleId: 2,
            m_anulado: 0
        };

        console.log("🟢 Enviando al backend:", datosAEnviar);

        try {
            const res = await axios.post('https://bk-tonita.onrender.com/api/users/register', datosAEnviar);
            console.log("✅ Registro exitoso:", res.data);

            setSuccess('Usuario registrado correctamente');
            setForm({
                name_cat: '',
                last_name_cat: '',
                alias_cat: '',
                email_cat: '',
                pass_cat: '',
                phone_cat: ''
            });
        } catch (err) {
            console.error("🔴 Error al registrar:", err?.response?.data || err.message);
            setError(err?.response?.data?.message || 'Error al registrar el usuario');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <input
                type="text"
                name="name_cat"
                value={form.name_cat}
                onChange={handleChange}
                placeholder="Nombre"
                className="p-3 border rounded-lg"
                required
            />
            <input
                type="text"
                name="last_name_cat"
                value={form.last_name_cat}
                onChange={handleChange}
                placeholder="Apellido"
                className="p-3 border rounded-lg"
                required
            />
            <input
                type="text"
                name="alias_cat"
                value={form.alias_cat}
                onChange={handleChange}
                placeholder="Alias"
                className="p-3 border rounded-lg"
                required
            />
            <input
                type="email"
                name="email_cat"
                value={form.email_cat}
                onChange={handleChange}
                placeholder="Correo electrónico"
                className="p-3 border rounded-lg"
                required
            />
            <input
                type="password"
                name="pass_cat"
                value={form.pass_cat}
                onChange={handleChange}
                placeholder="Contraseña"
                className="p-3 border rounded-lg"
                required
            />
            <input
                type="text"
                name="phone_cat"
                value={form.phone_cat}
                onChange={handleChange}
                placeholder="Número de teléfono (opcional)"
                className="p-3 border rounded-lg"
            />

            <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-bold"
            >
                ¡Registrarme! 🐱
            </button>
        </form>
    );
};

export default RegisterForm;
