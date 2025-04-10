import React from "react";

const MyOffert = () => {
  return (
    <div className="w-full h-60 bg-blue-600 flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-white font-bold text-3xl md:text-4xl">
          ¿Listo para asegurar tu espacio?
        </h1>
        <p className="text-white text-lg mt-2">
          Reserva ahora y obtén un 10% de descuento en tu primer mes. Oferta por
          tiempo limitado.
        </p>
        <button className="mt-4 px-6 py-3 text-sm font-medium bg-white  rounded-md shadow-md transition-all duration-300 hover:bg-gray-200">
          Reservar mi bodega
        </button>
      </div>
    </div>
  );
};

export default MyOffert;
