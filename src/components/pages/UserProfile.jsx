import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, CreditCard, Settings, LogOut, Edit2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useCRUD from '../../hooks/useCRUD';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const { readItem, saveData, loading: loadingData } = useCRUD();
  const userIdRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  });

  // Cargar datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        if (userIdRef.current !== userId) {
          userIdRef.current = userId;
          const data = await readItem(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });

          if (data) {
            setUserData(data);
            setFormData({
              first_name: data.first_name || '',
              last_name: data.last_name || '',
              email: data.email || '',
              phone: data.phone || ''
            });
          }
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Error al cargar los datos del usuario');
      }
    };

    fetchUserData();
  }, [readItem]);

  // Redirección fuera del render para evitar el error
  useEffect(() => {
    if (!user || !userData) {
      navigate('/');
    }
  }, [user, userData, navigate]);

  if (loading || loadingData || !user || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token || !userData) return;

    try {
      const response = await saveData(
        `${import.meta.env.VITE_API_URL}/users/${userIdRef.current}`,
        'PUT',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response) {
        setUserData(response);
        setIsEditing(false);
        toast.success('Perfil actualizado exitosamente');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.response?.data?.message || 'Error al actualizar el perfil');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">Mi Perfil</h1>
          </div>

          <div className="p-6">
            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Información Personal</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    name="first_name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <input
                    type="text"
                    name="last_name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.email}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    name="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    value={formData.phone}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Métodos de Pago</h2>
              </div>
              <p className="text-gray-600 mb-4">La integración con métodos de pago estará disponible próximamente.</p>
              <button
                disabled
                className="px-4 py-2 bg-gray-100 text-gray-500 rounded-md cursor-not-allowed"
              >
                Agregar método de pago
              </button>
            </section>

            <section className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Configuración</h2>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cambiar Contraseña</label>
                  <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                    Actualizar contraseña
                  </button>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notificaciones</label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Recibir notificaciones por email</span>
                  </div>
                </div>
              </div>
            </section>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              {isEditing ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Guardar Cambios
                </button>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Editar Información
                </button>
              )}
              <button
                onClick={handleLogout}
                className="px-6 py-2 text-red-600 border border-red-600 rounded-md hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
