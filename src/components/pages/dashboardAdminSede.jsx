import React from "react";
import SidebarAdminSede from "../layout/sidebarAdminSede";
import DashboardSede from "../sections/dashboardsede";
import BodegasList from "../sections/bodegaslist";
import PagosVencidos from "../sections/pagosvencidos";
import Reportes from "../sections/reportes";

const DashboardAdminSede = () => {
  return (
    <div className="flex w-full min-h-screen">
      <SidebarAdminSede />
      <main className="flex-1 bg-gray-50 overflow-y-auto scroll-smooth">
  <section id="dashboard" className="p-6 pb-0">
    <DashboardSede />
  </section>
  <section id="bodegas" className="px-6 pt-2 pb-6">
    <BodegasList />
  </section>
  <section id="vencidos" className="px-6 pt-2 pb-6">
    <PagosVencidos />
  </section>
  <section id="reportes" className="px-6 pt-2 pb-6">
    <Reportes />
  </section>
</main>

    </div>
  );
};

export default DashboardAdminSede;
