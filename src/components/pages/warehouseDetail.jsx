import { useState } from "react";
import { Link } from "react-router-dom";

const mockWarehouse = {
  warehouse_id: 1,
  code: "WH-001",
  dimensions: "5x4x3 meters",
  monthly_price: 1500,
  status: "available",
  site: {
    name: "UTEZ",
    location: "123 Main Street",
  },
  photos: [
    "https://images.unsplash.com/photo-1624927637280-f033784c1279?w=900&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1532635042-a6f6ad4745f9?w=900&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=900&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=60",
    "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=900&auto=format&fit=crop&q=60",
  ],
};

//to do: hacer que esto sea dinámico dependiendo de la card que se seleccione.
export default function WarehouseDetail() {
  const warehouse = mockWarehouse; // ← luego esto será una petición
  const [selectedImage, setSelectedImage] = useState(warehouse.photos[0]);

  return (
    <section className="container mx-auto px-6 py-12 mt-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Galería de imágenes */}
        <div className="w-full lg:w-1/2">
          <div className="border rounded-lg overflow-hidden">
            <img
              src={selectedImage}
              alt="Warehouse principal"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {warehouse.photos.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Vista ${index + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`w-24 h-24 object-cover cursor-pointer border rounded-lg ${
                  selectedImage === img ? "ring-2 ring-blue-600" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Información de la bodega */}
        <div className="w-full lg:w-1/2 space-y-4">
          <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full uppercase font-medium tracking-wide w-fit">
            {warehouse.status === "available" ? "Disponible" : "Ocupado"}
          </span>

          <h2 className="text-3xl font-bold">Bodega {warehouse.code}</h2>
          <p className="text-gray-600">Ubicación: {warehouse.site.name}</p>
          <p className="text-gray-600">Dirección: {warehouse.site.location}</p>

          <p className="text-xl font-semibold text-blue-600">
            ${warehouse.monthly_price} / mes
          </p>

          <div className="border-t pt-4 mt-4 space-y-2">
            <p className="text-gray-700">
              <strong>Dimensiones:</strong> {warehouse.dimensions}
            </p>
            <p className="text-gray-700">
              <strong>Código:</strong> {warehouse.code}
            </p>
            <p className="text-gray-700">
              <strong>Estado:</strong>{" "}
              {warehouse.status === "available" ? "Disponible" : "Ocupado"}
            </p>
          </div>
          <Link to={'/auth'}>
            <button className="cursor-pointer mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition">
              Reservar esta bodega
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
