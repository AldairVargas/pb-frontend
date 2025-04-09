import React, { useState } from "react";
import SidebarAdminSede from "../layout/sidebarAdminSede";
import DashboardSede from "../sections/dashboardsede";
import BodegasList from "../sections/bodegaslist";
import PagosVencidos from "../sections/pagosvencidos";
import Reportes from "../sections/reportes";
import ModalSaveWarehouse from "../ui/modalSaveWarehouse";

const DashboardAdminSede = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveWarehouse = (formData) => {
    // Here you would handle the form submission
    console.log('Warehouse data:', formData);
    // Add your API call or data handling logic here
    setIsModalOpen(false);
  };

  return (
    <div className="flex w-full min-h-screen">
      <SidebarAdminSede />
      <main className="flex-1 bg-gray-50 overflow-y-auto scroll-smooth">
        <section id="dashboard" className="p-6 pb-0">
          <DashboardSede />
        </section>
        <section id="bodegas" className="px-6 pt-2 pb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Bodegas</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add New Warehouse
            </button>
          </div>
          <BodegasList />
        </section>
        <section id="vencidos" className="px-6 pt-2 pb-6">
          <PagosVencidos />
        </section>
        <section id="reportes" className="px-6 pt-2 pb-6">
          <Reportes />
        </section>
      </main>

      <ModalSaveWarehouse
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveWarehouse}
      />
    </div>
  );
};

export default DashboardAdminSede;
