import React from "react";
import { Building2, Truck, ShieldCheck, ArrowRight } from "lucide-react";
const cardData = [
    {
      id: 1,
      icon: <Building2 className="w-10 h-10 stroke-blue-700 mt-4" />,
      title: "Bodegas Personales",
      description:
        "Espacios ideales para almacenar muebles, documentos y objetos personales durante mudanzas o renovaciones.",
    },
    {
      id: 2,
      icon: <Truck className="w-10 h-10 stroke-blue-700 mt-4" />,
      title: "Almacenamiento Comercial",
      description:
        "Soluciones para empresas que necesitan espacio adicional para inventario, archivos o equipamiento.",
    },
    {
      id: 3,
      icon: <ShieldCheck className="w-10 h-10 stroke-blue-700 mt-4" />,
      title: "Seguridad Avanzada",
      description:
        "Sistemas de vigilancia 24/7, control de acceso biométrico y alarmas contra incendios en todas nuestras instalaciones.",
    },
  ];
  
  export default function CardsGrid() {
    return (
        <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardData.map((card) => (
            <div
              key={card.id}
              className="p-6 flex flex-col items-start justify-center shadow-lg rounded-lg border border-gray-200"
            >
              {card.icon}
              <h2 className="text-2xl font-bold my-4">{card.title}</h2>
              <p className="text-gray-400">{card.description}</p>
              <a href="#contacto">
                <div className="flex flex-row items-center mt-4 text-blue-600">
                    <p className="text-sm">Saber más</p>
                    <ArrowRight className="w-3 h-3 ml-4 mt-0" />
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>      
    );
  }
  