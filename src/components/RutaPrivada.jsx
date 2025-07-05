import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RutaPrivada = ({ children }) => {
    const { usuarioAutenticado } = useAuth();

    return usuarioAutenticado ? children : <Navigate to="/login" />;
};

export default RutaPrivada;
