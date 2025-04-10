import React from "react";

const almacenes = [
  {
    nombre: "Almacén A1",
    ubicacion: "Sede Cuernavaca",
    capacidadTotal: 100,
    capacidadOcupada: 80,
    estado: "Activo",
  },
  {
    nombre: "Almacén B2",
    ubicacion: "Sede Temixco",
    capacidadTotal: 75,
    capacidadOcupada: 35,
    estado: "Activo",
  },
  {
    nombre: "Almacén C3",
    ubicacion: "Sede Jiutepec",
    capacidadTotal: 60,
    capacidadOcupada: 0,
    estado: "Inactivo",
  },
];

const AlmacenesAdmin = () => {
  return (
    <div className="p-6 pt-20 md:pt-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Almacenes</h1>

      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 text-base border-b border-gray-200">
              <th className="px-6 py-4 font-semibold">Nombre</th>
              <th className="px-6 py-4 font-semibold">Ubicación</th>
              <th className="px-6 py-4 font-semibold">Capacidad Total</th>
              <th className="px-6 py-4 font-semibold">Capacidad Ocupada</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-base">
            {almacenes.map((almacen, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{almacen.nombre}</td>
                <td className="px-6 py-4">{almacen.ubicacion}</td>
                <td className="px-6 py-4">{almacen.capacidadTotal}</td>
                <td className="px-6 py-4">{almacen.capacidadOcupada}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      almacen.estado === "Activo"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {almacen.estado}
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

export default AlmacenesAdmin;
