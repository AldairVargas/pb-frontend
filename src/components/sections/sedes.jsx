import React, { useEffect, useState } from "react";
import useCRUD from "../../hooks/useCRUD";
import { Plus } from "lucide-react";
import { toast } from "react-toastify";
import ModalSaveSite from "../ui/modalSaveSites";
import estadosData from "../../assets/json/estados.json";

const SedesAdmin = () => {
  const { data: sedes, fetchData, saveData, deleteData } = useCRUD(`${import.meta.env.VITE_API_URL}/sites`);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSite, setEditingSite] = useState(null);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const getEstadoMunicipio = (stateId, municipalityId) => {
    const estadoNombre = Object.keys(estadosData)[stateId - 1];
    const municipioNombre = estadosData[estadoNombre]?.[municipalityId - 1];
    return { estadoNombre, municipioNombre };
  };

  const handleSaveSite = async (formData) => {
    try {
      const payload = {
        name: formData.name,
        location: formData.location,
        status: parseInt(formData.status),
        state: parseInt(formData.state),
        municipality: parseInt(formData.municipality),
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      if (editingSite) {
        await saveData(`${import.meta.env.VITE_API_URL}/sites/${editingSite.site_id}`, "PUT", payload, headers);
        toast.success("Sede actualizada con éxito");
      } else {
        await saveData(`${import.meta.env.VITE_API_URL}/sites`, "POST", payload, headers);
        toast.success("Sede registrada con éxito");
      }

      await fetchData();
      setIsModalOpen(false);
      setEditingSite(null);
    } catch (error) {
      console.error("Error al guardar la sede:", error);
      const apiErrors = error?.response?.data?.errors;
      if (Array.isArray(apiErrors)) {
        apiErrors.forEach((err) => toast.error(`${err.field}: ${err.message}`));
      } else {
        toast.error(error.response?.data?.message || "Ocurrió un error al guardar la sede");
      }
    }
  };

  const handleDeleteSite = (siteId) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p className="mb-2">¿Estás seguro de eliminar esta sede?</p>
          <div className="flex gap-4 justify-end">
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              onClick={async () => {
                try {
                  await deleteData(`${import.meta.env.VITE_API_URL}/sites/${siteId}`, {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  });
                  toast.success("Sede eliminada correctamente");
                  fetchData();
                } catch (error) {
                  const message = error.response?.data?.message;
                  if (message?.includes("being used by other records")) {
                    toast.error("No se puede eliminar esta sede porque está en uso.");
                  } else {
                    toast.error("Ocurrió un error al eliminar la sede.");
                  }
                } finally {
                  closeToast();
                }
              }}
            >
              Confirmar
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded"
              onClick={closeToast}
            >
              Cancelar
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  return (
    <div className="p-6 pt-20 md:pt-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">Sedes</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => {
            setEditingSite(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus className="w-4 h-4" /> Crear Sede
        </button>
      </div>

      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 text-base border-b border-gray-200">
              <th className="px-6 py-4 font-semibold text-center">Nombre</th>
              <th className="px-6 py-4 font-semibold text-center">Dirección</th>
              <th className="px-6 py-4 font-semibold text-center">Estado</th>
              <th className="px-6 py-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-base">
            {sedes?.map((sede) => {
              const { estadoNombre, municipioNombre } = getEstadoMunicipio(sede.state, sede.municipality);
              return (
                <tr key={sede.site_id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 text-center">{sede.name}</td>
                  <td className="px-6 py-4 text-center">
                    {`${sede.location}, ${municipioNombre || "Municipio"}, ${estadoNombre || "Estado"}`}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {sede.status === 1 ? (
                      <span className="inline-block px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                        Activo
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 text-sm font-medium bg-gray-200 text-gray-700 rounded-full">
                        Inactivo
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-4">
                    <button
                      onClick={() => {
                        setEditingSite(sede);
                        setIsModalOpen(true);
                      }}
                      className="text-blue-600 hover:underline"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteSite(sede.site_id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ModalSaveSite
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSite(null);
        }}
        onSave={handleSaveSite}
        initialData={editingSite}
      />
    </div>
  );
};

export default SedesAdmin;
