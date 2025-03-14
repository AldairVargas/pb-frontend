import React from "react";
import { Phone, MapPin } from "lucide-react";

const MyContact = () => {
  return (
    <div id="contacto" className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Sección de Información */}
          <div className="flex flex-col justify-start text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold">¿Necesitas más información?</h1>
            <p className="text-gray-400 text-lg mt-3">
              Completa el formulario y uno de nuestros asesores se pondrá en
              contacto contigo para resolver todas tus dudas.
            </p>

            {/* Teléfono */}
            <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start">
              <div className="bg-gray-100 p-3 rounded-full shadow-lg">
                <Phone className="w-6 h-6 text-blue-700" />
              </div>
              <div className="flex flex-col sm:ml-4 text-center sm:text-left mt-2 sm:mt-0">
                <p className="text-md">Llámanos</p>
                <p className="text-blue-600 text-md">+52 (55) 987 654 321</p>
              </div>
            </div>

            {/* Dirección */}
            <div className="mt-6 flex flex-col sm:flex-row items-center sm:items-start">
              <div className="bg-gray-100 p-3 rounded-full shadow-lg">
                <MapPin className="w-6 h-6 text-blue-700" />
              </div>
              <div className="flex flex-col sm:ml-4 text-center sm:text-left mt-2 sm:mt-0">
                <p className="text-md">Visítanos</p>
                <p className="text-blue-600 text-md">Av. Principal #123, Ciudad</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 w-full md:w-auto">
            <h2 className="text-2xl font-bold mb-2 text-center md:text-left">Contáctanos</h2>
            <p className="text-gray-500 mb-6 text-center md:text-left">
              Completa el formulario y te responderemos a la brevedad.
            </p>

            <form className="space-y-4">
              {/* Nombre y Apellido */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold">Nombre</label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold">Apellido</label>
                  <input
                    type="text"
                    placeholder="Tu apellido"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="text-sm font-semibold">Teléfono</label>
                <input
                  type="tel"
                  placeholder="Tu teléfono"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Mensaje */}
              <div>
                <label className="text-sm font-semibold">Mensaje</label>
                <textarea
                  rows="4"
                  placeholder="¿En qué podemos ayudarte?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Botón */}
              <button
                type="submit"
                className="w-full px-4 py-3 text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyContact;
