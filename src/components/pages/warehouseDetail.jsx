import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useCRUD from "../../hooks/useCRUD";
import ImageGallery from "react-image-gallery";
import { toast } from "react-toastify";
import "react-image-gallery/styles/css/image-gallery.css";

export default function WarehouseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { readItem, saveData } = useCRUD();
  const [warehouse, setWarehouse] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const data = await readItem(
          `${import.meta.env.VITE_API_URL}/warehouses/${id}`
        );
        const photos = [];

        for (let i = 1; i <= 5; i++) {
          const key = `photo${i}`;
          if (data[key]) {
            const image = `data:image/jpeg;base64,${data[key]}`;
            photos.push({ original: image, thumbnail: image });
          }
        }

        setWarehouse(data);
        setGalleryImages(photos);
      } catch (error) {
        console.error("Error al cargar la bodega:", error);
      }
    };

    fetchWarehouse();
  }, [id]);

  const handleReservation = async () => {
    if (!token) {
      navigate("/auth");
      return;
    }

    try {
      await saveData(
        `${import.meta.env.VITE_API_URL}/reservations`,
        "post",
        { warehouse_id: warehouse.warehouse_id },
        { Authorization: `Bearer ${token}` }
      );
      toast.success("Bodega reservada con éxito");
      navigate("/profile"); // redirige al perfil o donde gustes
    } catch (error) {
      toast.error("Error al reservar la bodega");
      console.error("Reserva error:", error);
    }
  };

  if (!warehouse) return <div className="p-6">Cargando bodega...</div>;

  return (
    <section className="container mx-auto px-6 py-12 mt-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Galería */}
        <div className="w-full lg:w-1/2">
          <div className="relative z-0">
            <ImageGallery
              items={galleryImages}
              showPlayButton={false}
              showFullscreenButton={false}
              thumbnailPosition="bottom"
              renderItem={(item) => (
                <img
                  src={item.original}
                  alt=""
                  className="h-[350px] w-auto max-w-full object-contain mx-auto rounded-lg"
                />
              )}
            />
          </div>
        </div>

        {/* Información */}
        <div className="w-full lg:w-1/2 space-y-4">
          <h2 className="text-3xl font-bold">Bodega {warehouse.code}</h2>
          <p className="text-gray-600">Ubicación: {warehouse.Site?.name}</p>
          <p className="text-gray-600">Dirección: {warehouse.Site?.location}</p>

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
              <span
                className={`text-sm px-3 py-1 rounded-full uppercase font-medium tracking-wide w-fit ${
                  warehouse.status === "available"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {warehouse.status === "available" ? "Disponible" : "Ocupado"}
              </span>
            </p>
          </div>

          <button
            onClick={handleReservation}
            disabled={warehouse.status !== "available"}
            className={`mt-6 w-full py-3 rounded-lg text-white font-medium transition ${
              warehouse.status === "available"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {warehouse.status === "available"
              ? "Reservar esta bodega"
              : "No disponible"}
          </button>
        </div>
      </div>
    </section>
  );
}
