import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCRUD from "../../hooks/useCRUD";

const heightOptions = ["h-40", "h-52", "h-64", "h-80", "h-96"];

export default function GalleryMasonry() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: almacenes, fetchData } = useCRUD(`${import.meta.env.VITE_API_URL}/warehouses`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-6 min-h-screen">
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {almacenes?.map((img, idx) => (
          <div
            key={img.warehouse_id}
            className="relative break-inside-avoid rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 duration-300 group"
          >
            <img
              src={`data:image/jpeg;base64,${img.photo1}`}
              alt={`Bodega ${img.warehouse_id}`}
              className={`w-full rounded-lg object-cover ${
                heightOptions[idx % heightOptions.length]
              }`}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="text-white font-semibold">📍 {img.Site?.name || "Ubicación desconocida"}</p>
              <p className="text-white text-sm mb-2">💰 ${img.monthly_price} /mes</p>
              <button
                onClick={() => navigate(`/warehouse/${img.warehouse_id}`)}
                className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 cursor-pointer"
              >
                Ver más
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
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
