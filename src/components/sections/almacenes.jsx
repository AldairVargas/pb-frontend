import React, { useEffect, useState } from "react";
import useCRUD from "../../hooks/useCRUD";

const AlmacenesAdmin = () => {
  const { data: almacenes, fetchData, saveData } = useCRUD(`${import.meta.env.VITE_API_URL}/warehouses`);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const confirmToggleStatus = (almacen) => {
    setSelectedWarehouse(almacen);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmToggleStatus = async () => {
    try {
      await saveData(
        `${import.meta.env.VITE_API_URL}/warehouses/${selectedWarehouse.warehouse_id}/status`,
        "put",
        {
          status: selectedWarehouse.status === "occupied" ? "available" : "occupied",
        }
      );
      fetchData();
      setIsDeleteModalOpen(false);
      setSelectedWarehouse(null);
    } catch (err) {
      console.error("Error actualizando el estado:", err);
      alert("Ocurrió un error al actualizar el estado de la bodega.");
    }
  };

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
                  <button
                    onClick={() => confirmToggleStatus(almacen)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    {almacen.status === "occupied" ? "Desactivar" : "Activar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación */}
      {isDeleteModalOpen && selectedWarehouse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {selectedWarehouse.status === "occupied"
                ? "¿Desactivar esta bodega?"
                : "¿Activar esta bodega?"}
            </h2>
            <p className="text-sm text-gray-600 mb-6">Esta acción actualizará el estado de la bodega.</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmToggleStatus}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlmacenesAdmin;
