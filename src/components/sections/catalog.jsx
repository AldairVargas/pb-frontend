import React from "react";
import CardWarehouse from "../ui/cardWarehouse.jsx";
import { Link } from "react-router-dom";

const MyCatalog = () => {
  return (
    <div id="catalog" className="w-full min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col justify-center text-start max-w-screen-xl mx-auto">
          <h1 className="text-4xl font-bold">Catálogo de Bodegas</h1>
          <p className="text-gray-400 text-xl mt-3">
            Encuentra el espacio perfecto para tus necesidades
          </p>
        </div>

        {/* Cards */}
        <CardWarehouse />
        
        <div className="flex justify-center mt-6">
          <Link
            to="/gallery"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyCatalog;
