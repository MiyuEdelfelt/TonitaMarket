import React, { useState, useEffect } from 'react';
import EditarPublicacion from '../components/EditarPublicacion';
import axios from 'axios';

const EditarPublicacionPage = () => {
  const [publicacion, setPublicacion] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPublicacion = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/publications/mis-publicaciones`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.length > 0) {
          setPublicacion(res.data[0]); // por ahora tomamos la primera
        } else {
          alert('No tienes publicaciones para editar');
        }
      } catch (error) {
        console.error('Error al obtener publicaciones', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPublicacion();
  }, []);

  const handleClose = () => {
    window.history.back(); // vuelve atrás al cerrar
  };

  const handleUpdateSuccess = () => {
    alert('Publicación actualizada exitosamente');
  };

  if (loading) return <p className="text-center mt-10">Cargando...</p>;
  if (!publicacion) return <p className="text-center mt-10">No hay publicación para editar</p>;

  return (
    <div className="p-4">
      <EditarPublicacion
        publicacion={publicacion}
        onClose={handleClose}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </div>
  );
};

export default EditarPublicacionPage;
