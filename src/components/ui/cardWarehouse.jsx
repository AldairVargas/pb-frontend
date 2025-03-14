import React from "react";
import { MapPin } from "lucide-react";

const warehouses = [
  {
    id: 1,
    size: "3m²",
    name: "Mini Bodega",
    location: "Centro",
    price: 890,
    features: ["✅ Acceso 24/7", "❄️ Climatizado", "🔒 Seguridad"],
  },
  {
    id: 2,
    size: "5m²",
    name: "Bodega Pequeña",
    location: "Norte",
    price: 1_200,
    features: ["✅ Acceso 24/7", "❄️ Climatizado", "🚗 Estacionamiento"],
  },
  {
    id: 3,
    size: "10m²",
    name: "Bodega Mediana",
    location: "Sur",
    price: 1_800,
    features: ["✅ Acceso 24/7", "🔒 Seguridad", "📦 Espacio amplio"],
  },
];

const CardWarehouse = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {warehouses.map((warehouse) => (
          <div
            key={warehouse.id}
            className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
          >
            {/* Imagen con placeholder */}
            <div className="relative">
              <img
                src="https://placehold.co/300x200"
                alt="Bodega"
                className="w-full h-48 object-cover"
              />
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {warehouse.size}
              </span>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <h2 className="text-2xl font-bold">{warehouse.name}</h2>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{warehouse.location}</span>
              </div>

              {/* Precio */}
              <div className="mt-2 text-blue-600 text-xl font-bold">
                ${warehouse.price.toLocaleString()}{" "}
                <span className="text-gray-500 text-sm font-medium">/mes</span>
              </div>

              {/* Características */}
              <div className="flex flex-wrap gap-2 mt-4">
                {warehouse.features.map((feature, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Botón */}
              <button className="w-full mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700">
                Reservar ahora
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardWarehouse;
