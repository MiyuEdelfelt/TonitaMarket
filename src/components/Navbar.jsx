import { Link } from 'react-router-dom';
import {
    FaCat, FaChevronDown, FaUserCircle,
    FaShoppingCart, FaBars, FaTimes
} from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [mostrarExplorar, setMostrarExplorar] = useState(false);
    const [mostrarPublicar, setMostrarPublicar] = useState(false);
    const [mostrarUsuario, setMostrarUsuario] = useState(false);
    const [menuAbierto, setMenuAbierto] = useState(false);

    const explorarRef = useRef(null);
    const publicarRef = useRef(null);
    const usuarioRef = useRef(null);
    const menuRef = useRef(null);

    const { carrito } = useCarrito();
    const { usuarioAutenticado, logout } = useAuth();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!explorarRef.current?.contains(e.target)) setMostrarExplorar(false);
            if (!publicarRef.current?.contains(e.target)) setMostrarPublicar(false);
            if (!usuarioRef.current?.contains(e.target)) setMostrarUsuario(false);
            if (!menuRef.current?.contains(e.target)) setMenuAbierto(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="bg-green-200 shadow-md py-3 px-6 flex flex-col md:flex-row md:justify-between md:items-center">
            {/* LOGO Y HAMBURGUESA */}
            <div className="flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-green-800 flex items-center gap-2">
                    <FaCat /> Tonita Market
                </Link>
                <button
                    className="md:hidden text-green-800 text-xl"
                    onClick={() => setMenuAbierto(!menuAbierto)}
                >
                    {menuAbierto ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* MENÚ PRINCIPAL */}
            <div
                ref={menuRef}
                className={`md:flex md:flex-row md:items-center gap-6 transition-all duration-300 ease-in-out 
                ${menuAbierto ? 'flex flex-col mt-4' : 'hidden md:flex'}`}
            >
                <Link to="/" className="hover:underline text-green-800 font-semibold">Inicio</Link>
                <Link to="/adopciones" className="hover:underline text-green-800 font-semibold">Adopciones</Link>

                {/* EXPLORAR */}
                <div ref={explorarRef} className="relative">
                    <button
                        onClick={() => setMostrarExplorar(!mostrarExplorar)}
                        className="hover:underline text-green-800 font-semibold flex items-center gap-1"
                    >
                        Explorar <FaChevronDown />
                    </button>
                    {mostrarExplorar && (
                        <div className="absolute mt-1 bg-white border rounded shadow-lg z-10">
                            <Link to="/productos" className="block px-4 py-2 text-green-800 hover:bg-green-100">Productos</Link>
                            <Link to="/servicios" className="block px-4 py-2 text-green-800 hover:bg-green-100">Servicios</Link>
                        </div>
                    )}
                </div>

                {/* PUBLICAR (si está logueado) */}
                {usuarioAutenticado && (
                    <div ref={publicarRef} className="relative">
                        <button
                            onClick={() => setMostrarPublicar(!mostrarPublicar)}
                            className="hover:underline text-green-800 font-semibold flex items-center gap-1"
                        >
                            Publicar <FaChevronDown />
                        </button>
                        {mostrarPublicar && (
                            <div className="absolute mt-1 bg-white border rounded shadow-lg z-10">
                                <Link to="/publicar-producto" className="block px-4 py-2 text-green-800 hover:bg-green-100">Producto</Link>
                                <Link to="/publicar-servicio" className="block px-4 py-2 text-green-800 hover:bg-green-100">Servicio</Link>
                                <Link to="/publicar-adopcion" className="block px-4 py-2 text-green-800 hover:bg-green-100">Adopción</Link>
                            </div>
                        )}
                    </div>
                )}

                {/* CARRITO, HISTORIAL y ELIMINAR PUBLICACIONES */}
                {usuarioAutenticado && (
                    <>
                        <Link to="/carrito" className="flex items-center gap-1 text-green-800 font-semibold hover:underline">
                            <FaShoppingCart />
                            <span>{carrito.length}</span>
                        </Link>
                        <Link to="/historial" className="flex items-center gap-1 text-green-800 font-semibold hover:underline">
                            📜 Historial
                        </Link>

                        {usuarioAutenticado?.role_cat_id === 1 ? (
                            <Link
                                to="/admin/eliminar-publicaciones"
                                className="text-purple-800 font-semibold hover:underline"
                            >
                                🛠 Eliminar publicaciones
                            </Link>
                        ) : (
                            <Link
                                to="/eliminar-publicacion"
                                className="text-green-800 font-semibold hover:underline"
                            >
                                Eliminar publicación
                            </Link>
                        )}
                    </>
                )}

                {/* LOGIN / USUARIO */}
                {!usuarioAutenticado ? (
                    <Link to="/login" className="flex items-center gap-1 text-green-800 hover:underline">
                        <FaUserCircle /> Iniciar Sesión
                    </Link>
                ) : (
                    <div ref={usuarioRef} className="relative">
                        <button
                            onClick={() => setMostrarUsuario(!mostrarUsuario)}
                            className="flex flex-col items-center text-green-800 font-semibold"
                        >
                            <FaUserCircle size={22} />
                            <span className="text-sm">{usuarioAutenticado.nombre}</span>
                        </button>

                        {mostrarUsuario && (
                            <div className="absolute right-0 mt-2 bg-white border shadow-md rounded-md z-10 p-2 w-56">
                                <button
                                    onClick={logout}
                                    className="w-full text-center bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
