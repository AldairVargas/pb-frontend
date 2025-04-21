import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { User, CreditCard, Settings, LogOut, Edit2 } from 'lucide-react';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const UserProfile = () => {
  const { logout } = useAuth();
  const [userData, setUserData] = useState(null);
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
        const role = decodedToken.role;
        console.log('ID del usuario:', userId);
        console.log('Rol del usuario:', role);
  
        userIdRef.current = userId;
  
        const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        console.log("Status de respuesta:", response.status);
  
        if (!response.ok) {
          const errMsg = await response.text();
          throw new Error(`Error ${response.status}: ${errMsg}`);
        }
  
        const data = await response.json();
        console.log('Datos del usuario (fetch):', data);
  
        if (data) {
          setUserData(data);
          setFormData({
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            email: data.email || '',
            phone: data.phone || ''
          });
        }
      } catch (error) {
        console.error('Error en fetchUserData:', error);
        toast.error('Error al cargar los datos del usuario');
      }
    };
  
    fetchUserData();
  }, []);
  

  if (!userData) {
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/${userIdRef.current}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Error ${response.status}: ${errText}`);
      }
  
      const updatedData = await response.json();
      setUserData(updatedData);
      setIsEditing(false);
      toast.success('Perfil actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar:', error);
      toast.error('Error al actualizar el perfil');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 flex items-center gap-2">
        <User className="w-7 h-7 text-blue-600" />
        Información Personal
      </h1>
  
      {/* DATOS PERSONALES */}
      <section className="mb-12 pl-4 border-l-4 border-blue-600">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Datos del Usuario
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
          <div>
            <label className="block text-sm text-gray-500 mb-1">Nombre</label>
            <input
              type="text"
              name="first_name"
              className="w-full border-b-2 border-gray-300 bg-transparent px-1 py-1 text-gray-900 focus:outline-none focus:border-blue-500"
              value={formData.first_name}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Apellido</label>
            <input
              type="text"
              name="last_name"
              className="w-full border-b-2 border-gray-300 bg-transparent px-1 py-1 text-gray-900 focus:outline-none focus:border-blue-500"
              value={formData.last_name}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border-b-2 border-gray-300 bg-transparent px-1 py-1 text-gray-900 focus:outline-none focus:border-blue-500"
              value={formData.email}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-500 mb-1">Teléfono</label>
            <input
              type="tel"
              name="phone"
              className="w-full border-b-2 border-gray-300 bg-transparent px-1 py-1 text-gray-900 focus:outline-none focus:border-blue-500"
              value={formData.phone}
              onChange={handleInputChange}
              readOnly={!isEditing}
            />
          </div>
        </div>
      </section>
  
      {/* MÉTODOS DE PAGO */}
      <section className="mb-12 pl-4 border-l-4 border-yellow-500">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-yellow-500" />
          Métodos de Pago
        </h2>
        <p className="text-gray-500 mb-2">La integración estará disponible próximamente.</p>
        <button
          disabled
          className="px-4 py-2 bg-gray-200 text-gray-400 rounded-md cursor-not-allowed"
        >
          Agregar método de pago
        </button>
      </section>
  
      {/* CONFIGURACIÓN */}
      <section className="mb-12 pl-4 border-l-4 border-gray-500">
        <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-500" />
          Configuración
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Cambiar Contraseña</label>
            <button className="px-4 py-2 text-sm text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors">
              Actualizar contraseña
            </button>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Recibir notificaciones por email</span>
          </div>
        </div>
      </section>
  
      {/* ACCIONES */}
      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
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
  );
};

export default UserProfile;
