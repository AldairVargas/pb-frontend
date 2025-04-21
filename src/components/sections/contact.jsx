import React from "react";
import { Phone, MapPin } from "lucide-react";
import warehouseImg from "../../assets/images/warehouse.png";


const escapeHTML = (str) => {
  return str.replace(/[&<>"']/g, (match) => {
    const escapeChars = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return escapeChars[match];
  });
};

const handleSecureSubmit = (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  for (let [key, value] of formData.entries()) {
    if (/<script.*?>|<\/script>/gi.test(value)) {
      alert("Entrada inválida detectada.");
      return;
    }
    formData.set(key, escapeHTML(value));
  }

  console.log("Datos escapados y seguros:", Object.fromEntries(formData));
  // Aquí podrías enviar al backend
};

const MyContact = () => {
  return (
    <div id="contacto" className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Sección de Información */}
          <div className="flex flex-col justify-start text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold">¿Necesitas más información?</h1>
            <p className="text-gray-400 text-lg mt-3">
              Completa el formulario y uno de nuestros asesores se pondrá en contacto contigo para resolver todas tus dudas.
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
          <div className="bg-white rounded-lg shadow-2xl border border-gray-200 w-full md:w-auto">
          <img src={warehouseImg} className="rounded-lg shadow-2xl" alt="warehouse" />

          </div>
        </div>
      </div>
    </div>
  );
};

export default MyContact;
