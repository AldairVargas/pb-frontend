import React from "react";
import SidebarCliente from "../layout/sidebarCliente";
import MisReservas from "./MisReservas";
import UserProfile from "./UserProfile";

const DashboardCliente = () => {
  return (
    <div className="flex w-full min-h-screen">
      <SidebarCliente />

      <main className="flex-1 bg-gray-50 overflow-y-auto scroll-smooth">
        {/* Sección de Bienvenida */}
        <section id="inicio" className="p-6 pb-0">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-blue-600">
              ¡Bienvenido a Bodega Segura!
            </h1>
            <p className="text-gray-600 mt-1">
              Explora bodegas disponibles y gestiona tus reservas.
            </p>
          </div>
        </section>

        {/* Reservas del cliente */}
        <section id="reservas" className="px-6 pt-2 pb-6">
          <h2 className="text-2xl font-semibold text-blue-500 mb-4">
            Mis Reservas
          </h2>
          <MisReservas />
        </section>

        {/* Informacion personal del cliente */}
        <section id="informacion" className="px-6 pt-2 pb-6">
          <UserProfile />
        </section>
      </main>
    </div>
  );
};

export default DashboardCliente;
