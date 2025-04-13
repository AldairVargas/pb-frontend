import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCRUD from "../../hooks/useCRUD";

const heightOptions = ["h-40", "h-52", "h-64", "h-80", "h-96"];

export default function GalleryMasonry() {
  const navigate = useNavigate();
  const { data: almacenes, fetchData } = useCRUD(`${import.meta.env.VITE_API_URL}/warehouses`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const bodegasDisponibles = almacenes?.filter(bodega => bodega.status === "available");

  return (
    <div className="p-6 min-h-screen">
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {bodegasDisponibles?.map((img, idx) => (
          <div
            key={img.warehouse_id}
            onClick={() => navigate(`/warehouse/${img.warehouse_id}`)}
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
              <p className="text-white text-sm">💰 ${img.monthly_price} /mes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
