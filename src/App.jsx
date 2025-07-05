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

import { CarritoProvider } from './context/CarritoContext';
import { AuthProvider } from './context/AuthContext';
import RutaPrivada from './components/RutaPrivada';

const App = () => {
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
            <Route
              path="/productos"
              element={
                <RutaPrivada>
                  <Productos />
                </RutaPrivada>
              }
            />
            <Route
              path="/servicios"
              element={
                <RutaPrivada>
                  <Servicios />
                </RutaPrivada>
              }
            />
            <Route
              path="/carrito"
              element={
                <RutaPrivada>
                  <Carrito />
                </RutaPrivada>
              }
            />
            <Route
              path="/publicar-producto"
              element={
                <RutaPrivada>
                  <PublicarProducto />
                </RutaPrivada>
              }
            />
            <Route
              path="/publicar-servicio"
              element={
                <RutaPrivada>
                  <PublicarServicio />
                </RutaPrivada>
              }
            />
            <Route
              path="/publicar-adopcion"
              element={
                <RutaPrivada>
                  <PublicarAdopcion />
                </RutaPrivada>
              }
            />
            <Route
              path="/chat"
              element={
                <RutaPrivada>
                  <Chat />
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