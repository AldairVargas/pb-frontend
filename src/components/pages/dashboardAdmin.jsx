import React from "react";
import SidebarAdmin from "../layout/sidebarAdmin"
import Dashboard from "../sections/dashboard";
import UsuariosAdmin from "../sections/usuariosadmin";
import Sedes from "../sections/sedes"
import AlmacenesAdmin from "../sections/almacenes";
import ReportesAdmin from "../sections/reportesadmin";
const DashboardAdmin = () => {
  return (
    <div className="flex w-full min-h-screen">
      < SidebarAdmin />
      <main className="flex-1 bg-gray-50 overflow-y-auto scroll-smooth">
  <section id="dashboard" className="p-6 pb-0">
    < Dashboard />
  </section>
  <section id="usuarios" className="p-6 pb-0">
    < UsuariosAdmin />
  </section>
  <section id="sedes" className="p-6 pb-0">
    < Sedes />
  </section>
  <section id="almacenes" className="p-6 pb-0">
    < AlmacenesAdmin />
  </section>
  <section id="almacenes" className="p-6 pb-0">
    < ReportesAdmin />
  </section>
</main>

    </div>
  );
};

export default DashboardAdmin;
