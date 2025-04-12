import React, { useState } from "react";
import SidebarAdminSede from "../layout/sidebarAdminSede";
import DashboardSede from "../sections/dashboardsede";
import BodegasList from "../sections/bodegaslist";
import PagosVencidos from "../sections/pagosvencidos";
import Reportes from "../sections/reportes";
import ModalSaveWarehouse from "../ui/modalSaveWarehouse";
import useCRUD from "../../hooks/useCRUD";
import { toast } from "react-toastify";

const DashboardAdminSede = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reloadBodegas, setReloadBodegas] = useState(false);

  const { saveData } = useCRUD(`${import.meta.env.VITE_API_URL}/warehouses`);

  const handleSaveWarehouse = async (formData) => {
    try {
      const payload = {
        code: formData.code,
        dimensions: formData.dimensions,
        monthly_price: parseFloat(formData.monthly_price),
        status: formData.status,
        site_id: parseInt(formData.site_id),
      };

      const base64Promises = formData.photos.map((file) =>
        file ? convertToBase64(file) : null
      );

      const base64Results = await Promise.all(base64Promises);

      base64Results.forEach((base64, i) => {
        if (base64) {
          payload[`photo${i + 1}`] = base64.replace(/^data:image\/\w+;base64,/, "");
        }
      });

      await saveData(`${import.meta.env.VITE_API_URL}/warehouses`, "POST", payload, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });

      toast.success("Bodega registrada con éxito");
      setReloadBodegas(prev => !prev); // 🔁 fuerza recarga en BodegasList
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar la bodega:", error);
      const apiErrors = error?.response?.data?.errors;
      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((err) => toast.error(`${err.field}: ${err.message}`));
      } else {
        toast.error("Ocurrió un error al guardar la bodega");
      }
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });
  };

  return (
    <div className="flex w-full min-h-screen">
      <SidebarAdminSede />
      <main className="flex-1 bg-gray-50 overflow-y-auto scroll-smooth">
        <section id="dashboard" className="p-6 pb-0">
          <DashboardSede />
        </section>

        <section id="bodegas" className="px-6 pt-2 pb-3">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-4xl font-bold text-blue-600 mb-6 px-6">Bodegas</h1>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Registrar nueva bodega
            </button>
          </div>
          <BodegasList reload={reloadBodegas} />
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
