import React, { useMemo } from "react";
import CardWarehouse from "../ui/cardWarehouse.jsx";
import { Link } from "react-router-dom";
import useCRUD from "../../hooks/useCRUD";

const MyCatalog = () => {
  const {
    data,
    loading: isLoading,
    error,
  } = useCRUD(`${import.meta.env.VITE_API_URL}warehouses`);

  const warehouses = useMemo(() => {
    if (!Array.isArray(data)) return [];

    return data.map((w) => ({
      id: w.warehouse_id,
      size: w.dimensions || "Tamaño no especificado",
      name: w.code || "Bodega",
      location: w.Site?.name || "Ubicación no disponible",
      price: w.monthly_price || 0,
      features: ["📦 Espaciosa", "🔒 Seguridad", "✅ Accesible"],
      image: w.photo1
        ? `data:image/jpeg;base64,${w.photo1}`
        : "/images/default-warehouse.jpg",
    }));
  }, [data]);

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-gray-100 py-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-gray-100 py-12 flex items-center justify-center">
        <p className="text-red-600">Error al cargar las bodegas</p>
      </div>
    );
  }

  return (
    <div id="catalog" className="w-full min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col justify-center text-start max-w-screen-xl mx-auto">
          <h1 className="text-4xl font-bold">Catálogo de Bodegas</h1>
          <p className="text-gray-400 text-xl mt-3">
            Encuentra el espacio perfecto para tus necesidades
          </p>
        </div>

        {/* Cards */}
        <CardWarehouse data={warehouses.slice(0, 9)} />

        <div className="flex justify-center mt-6">
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyCatalog;
