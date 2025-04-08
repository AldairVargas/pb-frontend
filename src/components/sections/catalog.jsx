import React, { useEffect, useState } from "react";
import CardWarehouse from "../ui/cardWarehouse.jsx";
import { Link } from "react-router-dom";
import axios from "axios";

const MyCatalog = () => {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/warehouses");
        const formattedData = response.data.map((w) => ({
          id: w.warehouse_id,
          size: w.dimensions || "Tamaño no especificado",
          name: w.code || "Bodega",
          location: w.Site?.name || "Ubicación no disponible",
          price: w.monthly_price || 0,
          features: ["📦 Espaciosa", "🔒 Seguridad", "✅ Accesible"],
          image: `data:image/jpeg;base64,${w.photo1}`, // usa photo1 como imagen principal
        }));
        setWarehouses(formattedData);
      } catch (error) {
        console.error("Error al cargar bodegas:", error);
      }
    };

    fetchWarehouses();
  }, []);

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
        <CardWarehouse data={warehouses} />

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
