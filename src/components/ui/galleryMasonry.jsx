import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const heightOptions = ["h-40", "h-52", "h-64", "h-80", "h-96"];

export default function GalleryMasonry() {
  const navigate = useNavigate();
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}warehouses`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const raw = Array.isArray(response.data?.data)
          ? response.data.data
          : [];

        console.log("📦 Respuesta cruda:", raw);

        const parsed = raw.map((w) => ({
          id: w.warehouse_id,
          size: w.dimensions || "Tamaño no especificado",
          name: w.code || "Bodega",
          location: w.Site?.name || "Ubicación no disponible",
          price: w.monthly_price || 0,
          features: ["📦 Espaciosa", "🔒 Seguridad", "✅ Accesible"],
          image: w.photo1 && w.photo1.length > 100
            ? `data:image/jpeg;base64,${w.photo1}`
            : "../../assets/images/warehouse.png", // Reemplaza con la ruta de tu imagen predeterminada
        }));

        console.log("✅ Formateadas:", parsed);
        setWarehouses(parsed);
      } catch (error) {
        console.error("❌ Error al cargar bodegas:", error);
      }
    };

    fetchWarehouses();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {warehouses.map((w, idx) => (
          <div
            key={w.id}
            className="relative break-inside-avoid rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 duration-300 group"
          >
            <img
              src={w.image}
              alt={`Bodega ${w.name}`}
              className={`w-full rounded-lg object-cover ${
                heightOptions[idx % heightOptions.length]
              }`}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="text-white font-semibold">📍 {w.location}</p>
              <p className="text-white text-sm mb-2">💰 ${w.price} /mes</p>
              <button
                onClick={() => navigate(`/warehouse/${w.id}`)}
                className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 cursor-pointer"
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
