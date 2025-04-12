import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import useCRUD from "../../hooks/useCRUD";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import { Pencil, Trash2, Power } from "lucide-react";
import ModalUpdateWarehouse from "../ui/modalUpdateWarehouse";

const BodegasList = ({ reload }) => {
  const token = localStorage.getItem("token");
  const {
    data: almacenes,
    fetchData,
    saveData,
    deleteData,
  } = useCRUD(`${import.meta.env.VITE_API_URL}/warehouses`, {
    Authorization: `Bearer ${token}`,
  });

  const [showConfirm, setShowConfirm] = useState(false);
  const [showStatusConfirm, setShowStatusConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [nextStatus, setNextStatus] = useState(null);

  useEffect(() => {
    fetchData();
  }, [fetchData, reload]);

  const handleDeleteClick = (warehouse) => {
    if (warehouse.status === "occupied") {
      toast.warning("No se puede eliminar una bodega ocupada.");
      return;
    }
    setSelectedWarehouse(warehouse);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteData(
        `${import.meta.env.VITE_API_URL}/warehouses/${
          selectedWarehouse.warehouse_id
        }`,
        {
          Authorization: `Bearer ${token}`,
        }
      );
      toast.success("Bodega eliminada con éxito");
      setShowConfirm(false);
      setSelectedWarehouse(null);
    } catch (err) {
      console.error("Error al eliminar:", err);
      toast.error("No se pudo eliminar la bodega");
    }
  };

  const handleStatusChangeClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setNextStatus(warehouse.status === "occupied" ? "available" : "occupied");
    setShowStatusConfirm(true);
  };

  const confirmStatusChange = async () => {
    try {
      await saveData(
        `${import.meta.env.VITE_API_URL}/warehouses/${
          selectedWarehouse.warehouse_id
        }/status`,
        "put",
        { status: nextStatus },
        { Authorization: `Bearer ${token}` }
      );
      toast.success(
        `Bodega ${nextStatus === "available" ? "activada" : "ocupada"}`
      );
      setShowStatusConfirm(false);
      setSelectedWarehouse(null);
      setNextStatus(null);
      fetchData();
    } catch (err) {
      console.error("Error actualizando estado:", err);
      toast.error("No se pudo actualizar el estado de la bodega");
    }
  };

  const handleEditClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setShowEditModal(true);
  };

  const handleUpdateWarehouse = async (formData) => {
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
          payload[`photo${i + 1}`] = base64.replace(
            /^data:image\/\w+;base64,/,
            ""
          );
        }
      });

      await saveData(
        `${import.meta.env.VITE_API_URL}/warehouses/${
          selectedWarehouse.warehouse_id
        }`,
        "PUT",
        payload,
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      );

      toast.success("Bodega actualizada con éxito");
      fetchData();
      setShowEditModal(false);
      setSelectedWarehouse(null);
    } catch (error) {
      console.error("Error al actualizar la bodega:", error);
      toast.error("No se pudo actualizar la bodega");
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

  const getEstadoBadge = (status) => {
    if (status === "occupied") {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">
          Ocupado
        </span>
      );
    }
    if (status === "available") {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
          Disponible
        </span>
      );
    }
    return (
      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
        Desconocido
      </span>
    );
  };

  const columns = [
    {
      name: "Código",
      selector: (row) => row.code,
      sortable: true,
      cell: (row) => <div className="text-center w-full">{row.code}</div>,
    },
    {
      name: "Ubicación",
      selector: (row) => row.Site?.name || "N/A",
      sortable: true,
      cell: (row) => (
        <div className="text-center w-full">{row.Site?.name || "N/A"}</div>
      ),
    },
    {
      name: "Dimensiones",
      selector: (row) => row.dimensions,
      sortable: true,
      cell: (row) => <div className="text-center w-full">{row.dimensions}</div>,
    },
    {
      name: "Precio mensual",
      selector: (row) => row.monthly_price,
      sortable: true,
      cell: (row) => (
        <div className="text-center w-full">${row.monthly_price}</div>
      ),
    },
    {
      name: "Estado",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => (
        <div className="text-center w-full">{getEstadoBadge(row.status)}</div>
      ),
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex justify-center gap-3 w-full">
          <button
            onClick={() => handleEditClick(row)}
            className="text-blue-600 hover:text-blue-800"
            title="Editar"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleStatusChangeClick(row)}
            className={
              row.status === "occupied"
                ? "text-red-600 hover:text-red-800"
                : "text-green-600 hover:text-green-800"
            }
            title={row.status === "occupied" ? "Desactivar" : "Activar"}
          >
            <Power className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteClick(row)}
            className="text-red-500 hover:text-red-700"
            title="Eliminar"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const customStyles = {
    headRow: { style: { backgroundColor: "#f9fafb" } },
    headCells: {
      style: {
        justifyContent: "center",
        fontWeight: "600",
        fontSize: "14px",
        color: "#374151",
      },
    },
    cells: { style: { justifyContent: "center" } },
    rows: { style: { fontSize: "14px", color: "#374151", minHeight: "56px" } },
  };

  const sortedData = almacenes
    ?.slice()
    .sort((a, b) => b.warehouse_id - a.warehouse_id);

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      <DataTable
        columns={columns}
        data={sortedData}
        pagination
        highlightOnHover
        striped
        responsive
        customStyles={customStyles}
      />

      {/* Modal de edición */}
      <ModalUpdateWarehouse
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleUpdateWarehouse}
        initialData={selectedWarehouse}
      />

      {/* Modal de confirmación de eliminación */}
      <Dialog
        open={showConfirm}
        onClose={() => setShowConfirm(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
              Confirmar eliminación
            </Dialog.Title>
            <p className="text-sm text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar la bodega{" "}
              <strong>{selectedWarehouse?.code}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 text-sm rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm rounded bg-red-600 text-white hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Modal de confirmación de cambio de estado */}
      <Dialog
        open={showStatusConfirm}
        onClose={() => setShowStatusConfirm(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold text-gray-900 mb-4">
              Confirmar cambio de estado
            </Dialog.Title>
            <p className="text-sm text-gray-600 mb-6">
              ¿Estás seguro de que deseas{" "}
              {nextStatus === "available" ? "activar" : "ocupar"} la bodega{" "}
              <strong>{selectedWarehouse?.code}</strong>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowStatusConfirm(false)}
                className="px-4 py-2 text-sm rounded bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={confirmStatusChange}
                className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default BodegasList;
