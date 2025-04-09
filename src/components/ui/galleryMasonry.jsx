import { useState } from "react";
import { useNavigate } from "react-router-dom";

const warehouseImages = [
  {
    id: 101,
    image:
      "https://images.unsplash.com/photo-1624927637280-f033784c1279?w=900&auto=format&fit=crop&q=60",
    price: 2200,
    location: "Este",
  },
  {
    id: 102,
    image:
      "https://images.unsplash.com/photo-1532635042-a6f6ad4745f9?w=900&auto=format&fit=crop&q=60",
    price: 2500,
    location: "Centro",
  },
  {
    id: 103,
    image:
      "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=900&auto=format&fit=crop&q=60",
    price: 2500,
    location: "Centro",
  },
  {
    id: 104,
    image:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&auto=format&fit=crop&q=60",
    price: 2300,
    location: "Norte",
  },
  {
    id: 105,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=60",
    price: 2100,
    location: "Sur",
  },
  {
    id: 106,
    image:
      "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?w=900&auto=format&fit=crop&q=60",
    price: 1900,
    location: "Oeste",
  },
  {
    id: 107,
    image:
      "https://images.unsplash.com/photo-1624927637280-f033784c1279?w=900&auto=format&fit=crop&q=60",
    price: 1800,
    location: "Norte",
  },
  {
    id: 108,
    image:
      "https://images.unsplash.com/photo-1624927637280-f033784c1279?w=900&auto=format&fit=crop&q=60",
    price: 1700,
    location: "Centro",
  },
];

const heightOptions = ["h-40", "h-52", "h-64", "h-80", "h-96"];

export default function GalleryMasonry() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="p-6 min-h-screen">
      {/* Galería estilo Masonry */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {warehouseImages.map((img, idx) => (
          <div
            key={img.id}
            className="relative break-inside-avoid rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 duration-300 group"
          >
            <img
              src={img.image}
              alt={`Bodega ${img.id}`}
              className={`w-full rounded-lg object-cover ${
                heightOptions[idx % heightOptions.length]
              }`}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="text-white font-semibold">📍 {img.location}</p>
              <p className="text-white text-sm mb-2">💰 ${img.price} /mes</p>
              <button
                onClick={() => navigate(`/warehouse/${img.id}`)}
                className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 cursor-pointer"
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => navigate(`/warehouse/${img.id}`)}
        >
          <img
            src={selectedImage}
            alt="Ampliada"
            className="max-w-3xl w-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
