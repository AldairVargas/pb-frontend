import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const MyHero = () => {
  return (
    <div
      className="w-full mx-auto px-6 max-h-full lg:px-12 relative bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/src/assets/images/hero.jpg')",
      }}
    >
      <div className="relative z-10">
        <div className="spacer"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Sección de texto */}
          <div className="p-4 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
            <div className="bg-white p-2 rounded-full shadow-lg inline-block w-fit mt-8">
              <p className="text-xs font-bold">Espacios seguros y accesibles</p>
            </div>

            <div className="mt-6 w-full">
              <h1 className="font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white">
                El espacio que <span className="text-blue-400">necesitas </span>
                para lo que <span className="text-blue-400">valoras</span>
              </h1>
            </div>

            <div className="mt-6">
              <p className="text-lg sm:text-xl text-gray-200">
                Bodegas de alta seguridad con acceso 24/7, vigilancia permanente
                y precios competitivos para almacenar tus bienes personales o
                mercancía.
              </p>
            </div>

            {/* Botones */}
            <div className="mt-6 flex flex-col items-center w-full gap-4 sm:flex-row sm:justify-center lg:justify-start sm:gap-4">
              <Link to={"/auth"} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 flex justify-center items-center">
                  Reservar ahora
                  <ArrowRight className="inline-block ml-2" size={16} />
                </button>
              </Link>
              <Link to={"/gallery"}>
                <button className="w-full sm:w-auto px-6 py-3 text-sm font-medium bg-white rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300">
                  Ver galería
                </button>
              </Link>
            </div>
          </div>

          {/* Espacio para la columna de la derecha */}
          <div className="p-4 hidden lg:block"></div>
        </div>
        <div className="spacer"></div>
      </div>
    </div>
  );
};

export default MyHero;
