import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import useCRUD from "../../hooks/useCRUD";
import { style, title } from "framer-motion/client";

const BodegasList = ({ reload }) => {
  const { data: almacenes, fetchData, saveData } = useCRUD(`${import.meta.env.VITE_API_URL}/warehouses`);

  useEffect(() => {
    fetchData();
  }, [fetchData, reload]);

  const handleStatusChange = async (almacen) => {
    const newStatus = almacen.status === "occupied" ? "available" : "occupied";
    try {
      await saveData(
        `${import.meta.env.VITE_API_URL}/warehouses/${almacen.warehouse_id}/status`,
        "put",
        { status: newStatus }
      );
      fetchData();
    } catch (err) {
      console.error("Error actualizando estado:", err);
    }
  };

  const getEstadoBadge = (status) => {
    if (status === "occupied") {
      return <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700">Ocupado</span>;
    }
    if (status === "available") {
      return <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">Disponible</span>;
    }
    return <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">Desconocido</span>;
  };

  const columns = [
    {
      name: "Código",
      selector: (row) => row.code,
      sortable: true,
      cell: (row) => <div className="w-full text-center">{row.code}</div>,
    },
    {
      name: "Ubicación",
      selector: (row) => row.Site?.name || "N/A",
      sortable: true,
      cell: (row) => <div className="w-full text-center">{row.Site?.name || "N/A"}</div>,
    },
    {
      name: "Dimensiones",
      selector: (row) => row.dimensions,
      sortable: true,
      cell: (row) => <div className="w-full text-center">{row.dimensions}</div>,
    },
    {
      name: "Precio mensual",
      selector: (row) => row.monthly_price,
      sortable: true,
      cell: (row) => <div className="w-full text-center">${row.monthly_price}</div>,
    },
    {
      name: "Estado",
      selector: (row) => row.status,
      sortable: true,
      cell: (row) => <div className="w-full text-center">{getEstadoBadge(row.status)}</div>,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div className="flex justify-center gap-3 w-full">
          <button className="text-blue-600 hover:underline font-medium">Editar</button>
          <button
            onClick={() => handleStatusChange(row)}
            className={`font-medium ${
              row.status === "occupied"
                ? "text-red-600 hover:underline"
                : "text-green-600 hover:underline"
            }`}
          >
            {row.status === "occupied" ? "Desactivar" : "Activar"}
          </button>
        </div>
      ),
    },
  ];
  

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#f9fafb",
      },
    },
    headCells: {
      style: {
        justifyContent: "center",
        fontWeight: "600",
        fontSize: "14px",
        color: "#374151",
      },
    },
    cells: {
      style: {
        justifyContent: "center",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        color: "#374151",
        minHeight: "56px",
      },
    },
  };

  const sortedData = almacenes?.slice().sort((a, b) => b.warehouse_id - a.warehouse_id);

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
    </div>
  );
};

export default BodegasList;
