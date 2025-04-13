import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useCRUD from "../../hooks/useCRUD";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function WarehouseDetail() {
  const { id } = useParams();
  const { readItem } = useCRUD();
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

    fetchWarehouse(); // Solo se ejecuta cuando cambia el ID
  }, [id]); // ✅ quitamos readItem del array de dependencias

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
              renderLeftNav={(onClick, disabled) => (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                  disabled={disabled}
                  className="absolute z-10 top-1/2 left-2 -translate-y-1/2 bg-white text-gray-800 rounded-full p-1 shadow hover:bg-gray-100"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              )}
              renderRightNav={(onClick, disabled) => (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                  }}
                  disabled={disabled}
                  className="absolute z-10 top-1/2 right-2 -translate-y-1/2 bg-white text-gray-800 rounded-full p-1 shadow hover:bg-gray-100"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
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

          <Link to="/auth">
            <button className="cursor-pointer mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition">
              Reservar esta bodega
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
