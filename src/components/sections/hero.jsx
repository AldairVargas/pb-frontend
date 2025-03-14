import React from "react";
import "../../index.css";
import { ArrowRight } from "lucide-react";

const MyHero = () => {
  return (
    <div className="w-full mx-auto custom-color px-6 lg:px-12">
      <div className="spacer"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Sección de texto */}
        <div className="p-4 flex flex-col justify-center text-center md:text-left">
          <div className="bg-white p-2 rounded-full shadow-lg inline-block w-fit mt-8">
            <p className="text-xs font-bold">Espacios seguros y accesibles</p>
          </div>
          <div className="mt-6 w-full">
            <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
              El espacio que <span className="text-blue-600">necesitas</span> 
              para lo que <span className="text-blue-600">valoras</span>
            </h1>
          </div>
          <div className="mt-6">
            <p className="text-lg sm:text-xl text-gray-400">
              Bodegas de alta seguridad con acceso 24/7, vigilancia permanente y 
              precios competitivos para almacenar tus bienes personales o 
              mercancía.
            </p>
          </div>
          {/* Botones */}
          <div className="mt-6 flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <button className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
              Reservar Ahora
              <ArrowRight className="inline-block ml-2" />
            </button>
            <button className="px-6 py-3 text-sm font-medium bg-white rounded-lg shadow-md">
              Ver Catálogo
            </button>
          </div>
        </div>

        {/* Imagen */}
        <div className="p-4 flex items-center justify-center">
          <div className="rounded-lg overflow-hidden">
            <img 
              src="https://placehold.co/600x350" 
              alt="Imagen Bodega"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className="spacer"></div>
    </div>
  );
};

export default MyHero;
