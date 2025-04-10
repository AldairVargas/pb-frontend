import React, { useEffect } from "react";
import useCRUD from "../../hooks/useCRUD";

const AlmacenesAdmin = () => {
  const { data: almacenes, fetchData } = useCRUD(`${import.meta.env.VITE_API_URL}/warehouses`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-6 pt-20 md:pt-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Almacenes</h1>
      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 text-base border-b border-gray-200">
              <th className="px-6 py-4 font-semibold">Código</th>
              <th className="px-6 py-4 font-semibold">Ubicación</th>
              <th className="px-6 py-4 font-semibold">Dimensiones</th>
              <th className="px-6 py-4 font-semibold">Precio mensual</th>
              <th className="px-6 py-4 font-semibold">Estado</th>
              <th className="px-6 py-4 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-base">
            {almacenes?.map((almacen) => (
              <tr key={almacen.warehouse_id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4">{almacen.code}</td>
                <td className="px-6 py-4">{almacen.Site?.name}</td>
                <td className="px-6 py-4">{almacen.dimensions}</td>
                <td className="px-6 py-4">${almacen.monthly_price}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    almacen.status === "occupied"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {almacen.status === "occupied" ? "Ocupado" : "Disponible"}
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

export default AlmacenesAdmin;
