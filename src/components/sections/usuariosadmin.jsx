import React from "react";

const usuarios = [
  {
    nombre: "Juan Pérez",
    correo: "juan@correo.com",
    rol: "Administrador de Sede",
    estado: "Activo",
  },
  {
    nombre: "María López",
    correo: "maria@correo.com",
    rol: "Usuario",
    estado: "Inactivo",
  },
  {
    nombre: "Carlos Sánchez",
    correo: "carlos@correo.com",
    rol: "Super Admin",
    estado: "Activo",
  },
];

const UsuariosAdmin = () => {
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
            {usuarios.map((user, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{user.nombre}</td>
                <td className="px-6 py-4">{user.correo}</td>
                <td className="px-6 py-4">{user.rol}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      user.estado === "Activo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {user.estado}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button className="text-blue-600 hover:underline font-medium">
                    Editar
                  </button>
                  <button className="text-red-600 hover:underline font-medium">
                    Eliminar
                  </button>
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
