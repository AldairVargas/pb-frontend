import React, { useEffect, useState } from "react";
import useCRUD from "../../hooks/useCRUD";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import ModalSaveSite from "../ui/modalSaveSites";

const SedesAdmin = () => {
  const { data: sedes, fetchData, saveData } = useCRUD(`${import.meta.env.VITE_API_URL}/sites`);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSaveSite = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        location: formData.location,
        status: parseInt(formData.status),
        state: parseInt(formData.state),
        municipality: parseInt(formData.municipality),
      };

      await saveData(`${import.meta.env.VITE_API_URL}/sites`, "POST", payload, {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });

      toast.success("Sede registrada con éxito");
      await fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error al guardar la sede:", error);
      const apiErrors = error?.response?.data?.errors;
      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((err) => toast.error(`${err.field}: ${err.message}`));
      } else {
        toast.error("Ocurrió un error al guardar la sede");
      }
    }
  };

  return (
    <div className="p-6 pt-20 md:pt-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Sedes</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus className="w-4 h-4" /> Crear Sede
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 text-base border-b border-gray-200">
              <th className="px-6 py-4 font-semibold">Nombre</th>
              <th className="px-6 py-4 font-semibold">Dirección</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-base">
            {sedes?.map((sede) => (
              <tr key={sede.site_id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4">{sede.name}</td>
                <td className="px-6 py-4">{sede.location}</td>
                <td className="px-6 py-4">{sede.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalSaveSite
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveSite}
      />
    </div>
  );
};

export default SedesAdmin;
