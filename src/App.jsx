import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Login from './pages/Login';
import Register from './pages/Register';
import RecoverPassword from './pages/RecoverPassword';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Adopciones from './pages/Adopciones';
import Servicios from './pages/Servicios';
import Carrito from './pages/Carrito';
import Explorar from './pages/Explorar';

import PublicarProducto from './pages/PublicarProducto';
import PublicarServicio from './pages/PublicarServicio';
import PublicarAdopcion from './pages/PublicarAdopcion';
import Chat from './pages/Chat';
import Historial from './pages/Historial';

import { CarritoProvider } from './context/CarritoContext';
import { AuthProvider } from './context/AuthContext';
import RutaPrivada from './components/RutaPrivada';

import EditarPublicacionPage from './pages/EditarPublicacion';
import EliminarPublicacionPage from './pages/EliminarPublicacion';

import ListadoEliminarPublicaciones from './pages/ListadoEliminarPublicaciones';
import ListadoEliminarPublicacionesAdmin from './pages/ListadoEliminarPublicacionesAdmin';

const App = () => {
  // Se obtiene el usuario autenticado desde localStorage (lo puedes mejorar con context si deseas)
  const usuario = JSON.parse(localStorage.getItem('usuarioToñita'));

  return (
    <AuthProvider>
      <CarritoProvider>
        <Router>
          <Navbar />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/recuperar" element={<RecoverPassword />} />
            <Route path="/adopciones" element={<Adopciones />} />
            <Route path="/explorar" element={<Explorar />} />

            {/* Rutas protegidas */}
            <Route path="/productos" element={<RutaPrivada><Productos /></RutaPrivada>} />
            <Route path="/servicios" element={<RutaPrivada><Servicios /></RutaPrivada>} />
            <Route path="/carrito" element={<RutaPrivada><Carrito /></RutaPrivada>} />
            <Route path="/publicar-producto" element={<RutaPrivada><PublicarProducto /></RutaPrivada>} />
            <Route path="/publicar-servicio" element={<RutaPrivada><PublicarServicio /></RutaPrivada>} />
            <Route path="/publicar-adopcion" element={<RutaPrivada><PublicarAdopcion /></RutaPrivada>} />
            <Route path="/historial" element={<RutaPrivada><Historial /></RutaPrivada>} />
            <Route path="/chat" element={<RutaPrivada><Chat /></RutaPrivada>} />

            {/* Editar/eliminar por ID */}
            <Route path="/editar-publicacion/:id" element={<RutaPrivada><EditarPublicacionPage /></RutaPrivada>} />
            <Route path="/eliminar-publicacion/:id" element={<RutaPrivada><EliminarPublicacionPage /></RutaPrivada>} />

            {/* SOLO USUARIO NORMAL */}
            <Route
              path="/eliminar-publicacion"
              element={
                <RutaPrivada>
                  {usuario?.role_cat_id !== 1 ? (
                    <ListadoEliminarPublicaciones />
                  ) : (
                    <p className="text-center text-red-600 mt-10 font-semibold">Acceso denegado</p>
                  )}
                </RutaPrivada>
              }
            />

            {/* SOLO ADMIN */}
            <Route
              path="/admin/eliminar-publicaciones"
              element={
                <RutaPrivada>
                  {usuario?.role_cat_id === 1 ? (
                    <ListadoEliminarPublicacionesAdmin />
                  ) : (
                    <p className="text-center text-red-600 mt-10 font-semibold">Acceso denegado</p>
                  )}
                </RutaPrivada>
              }
            />
          </Routes>
        </Router>
      </CarritoProvider>
    </AuthProvider>
  );
};

export default App;
