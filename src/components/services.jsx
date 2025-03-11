import React from "react";

import "../index.css";
import CardServices from "./cardServices";

const OurServices = () => {
  return (
    <div className="w-full mx-auto mt-8">
      <div className="spacer"></div>
      <div className="flex flex-col justify-center">
        <h1 className="font-bold text-center text-5xl">Nuestros Servicios</h1>
        <div className="w-1/2 mx-auto mt-4">
          <p className="text-1xl text-center text-gray-400 ">
            Ofrecemos soluciones de almacenamiento flexibles adaptadas a tus
            necesidades, con la máxima seguridad y comodidad.
          </p>
        </div>
      </div>
      <div className="spacer"></div>
      <CardServices />
      <div className="spacer"></div>
    </div>
  );
};

export default OurServices;
