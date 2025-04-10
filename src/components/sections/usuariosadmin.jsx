import React, { useEffect } from "react";
import useCRUD from "../../hooks/useCRUD";

const UsuariosAdmin = () => {
  const { data: usuarios, fetchData } = useCRUD(`${import.meta.env.VITE_API_URL}/users`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-6 pt-20 md:pt-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Usuarios</h1>
      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 text-base border-b border-gray-200">
              <th className="px-6 py-4 font-semibold">Nombre</th>
              <th className="px-6 py-4 font-semibold">Correo</th>
              <th className="px-6 py-4 font-semibold">Rol</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-base">
            {usuarios?.map((user) => (
              <tr key={user.user_id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4">{user.first_name} {user.last_name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.Role?.role_name}</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                    Activo
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button className="text-blue-600 hover:underline font-medium">Editar</button>
                  <button className="text-red-600 hover:underline font-medium">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosAdmin;
