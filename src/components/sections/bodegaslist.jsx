import React from "react";
import { Pencil, Trash2, RotateCcw } from "lucide-react";

const bodegas = [
  {
    id: 1,
    nombre: "Bodega A",
    estado: "libre",
    precio: "$1,200 MXN",
    tamaño: "3x4 m",
    imagen: "https://placehold.co/300x200",
  },
  {
    id: 2,
    nombre: "Bodega B",
    estado: "ocupada",
    precio: "$1,800 MXN",
    tamaño: "4x5 m",
    imagen: "https://placehold.co/300x200",
  },
  {
    id: 3,
    nombre: "Bodega C",
    estado: "vencida",
    precio: "$1,500 MXN",
    tamaño: "3x3 m",
    imagen: "https://placehold.co/300x200",
  },
];

const getEstadoColor = (estado) => {
  switch (estado) {
    case "libre":
      return "text-green-600 bg-green-50";
    case "ocupada":
      return "text-blue-600 bg-blue-50";
    case "vencida":
      return "text-red-600 bg-red-50";
    default:
      return "text-gray-500 bg-gray-100";
  }
};

const BodegasList = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">Bodegas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bodegas.map((bodega) => (
          <div
            key={bodega.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <img
              src={bodega.imagen}
              alt={`Imagen ${bodega.nombre}`}
              className="w-full h-48 object-cover rounded-t-xl"
            />

            <div className="p-4">
              <h2 className="text-lg font-bold text-gray-800">{bodega.nombre}</h2>
              <p className="text-gray-500 text-sm mb-2">Tamaño: {bodega.tamaño}</p>
              <p className="text-gray-500 text-sm mb-4">Precio: {bodega.precio}</p>

              <span
                className={`text-xs font-medium px-3 py-1 rounded-full ${getEstadoColor(
                  bodega.estado
                )}`}
              >
                {bodega.estado.toUpperCase()}
              </span>

              <div className="mt-4 flex space-x-2">
                <button className="flex items-center px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                  <Pencil className="w-4 h-4 mr-1" /> Editar
                </button>

                {bodega.estado === "ocupada" && (
                  <button className="flex items-center px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition">
                    <Trash2 className="w-4 h-4 mr-1" /> Desalojar
                  </button>
                )}

                {bodega.estado === "vencida" && (
                  <button className="flex items-center px-3 py-1 text-sm font-medium text-yellow-600 border border-yellow-600 rounded-lg hover:bg-yellow-600 hover:text-white transition">
                    <RotateCcw className="w-4 h-4 mr-1" /> Rehabilitar
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BodegasList;
