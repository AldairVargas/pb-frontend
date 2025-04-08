import { useEffect } from "react";
import CardWarehouse from "../ui/cardWarehouse";

const customWarehouseData = [
  {
    id: 101,
    size: "6m²",
    name: "Bodega VIP",
    location: "Este",
    price: 2200,
    features: ["✅ Acceso 24/7", "🪟 Luz natural", "💡 Sensor de movimiento"],
    image:
      "https://images.unsplash.com/photo-1624927637280-f033784c1279?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: 102,
    size: "8m²",
    name: "Bodega Premium",
    location: "Centro",
    price: 2500,
    features: ["❄️ Climatizado", "🔒 Doble seguridad", "🚗 Estacionamiento"],
    image:
      "https://images.unsplash.com/photo-1532635042-a6f6ad4745f9?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: 103,
    size: "10m²",
    name: "Bodega Premium",
    location: "Centro",
    price: 2500,
    features: ["❄️ Climatizado", "🔒 Doble seguridad", "🚗 Estacionamiento"],
    image:
      "https://images.unsplash.com/photo-1565610222536-ef125c59da2e?w=900&auto=format&fit=crop&q=60",
  },
];

export default function WarehouseGallery() {
  useEffect(() => {
    import("flowbite").then((m) => m.initCarousels());
  }, []);

  return (
    <div className="pt-16 md:pt-16">
      <div
        id="animation-carousel"
        className="relative w-full"
        data-carousel="slide" // Cambiado de 'static' a 'slide' para autoplay
      >
        {/* Carousel wrapper */}
        <div className="relative h-56 overflow-hidden md:h-96">
          {customWarehouseData.map((item, index) => (
            <div
              key={item.id}
              className={`${
                index === 0 ? "" : "hidden"
              } duration-200 ease-linear`}
              data-carousel-item={index === 0 ? "active" : ""}
            >
              <img
                src={item.image}
                alt={item.name}
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              />
            </div>
          ))}
        </div>

        {/* Slider controls */}
        <button
          type="button"
          className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-prev
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 group-hover:bg-white/50 dark:group-hover:bg-blue-700 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70">
            <svg
              className="w-4 h-4 text-white rtl:rotate-180"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
            <span className="sr-only">Previous</span>
          </span>
        </button>

        <button
          type="button"
          className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
          data-carousel-next
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 group-hover:bg-white/50 dark:group-hover:bg-blue-700 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70">
            <svg
              className="w-4 h-4 text-white rtl:rotate-180"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
            <span className="sr-only">Next</span>
          </span>
        </button>
      </div>

      {/* Cards abajo */}
      <div className="px-6 mt-8">
        <CardWarehouse data={customWarehouseData} />
      </div>
    </div>
  );
}
