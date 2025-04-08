import CardWarehouse from "../ui/cardWarehouse";
import { Carousel } from "flowbite-react";

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
  return (
    <div className="pt-16 md:pt-20 px-0 sm:px-6 py-8">
      {/* Carrusel Full Width */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] xl:h-[600px] 2xl:h-[700px]">
        <Carousel
          slide={true}
          className="rounded-none"
        >
          {customWarehouseData.map((warehouse) => (
            <img
              key={warehouse.id}
              src={warehouse.image}
              alt={warehouse.name}
              className="w-full h-full object-cover"
            />
          ))}
        </Carousel>
      </div>

      {/* Cards debajo */}
      <div className="px-6">
        <CardWarehouse data={customWarehouseData} />
      </div>
    </div>
  );
}
