import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Info, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

const PagosVencidosList = () => {
  const [pagos, setPagos] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/payments/subscriptions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPagos(data);
      } catch (err) {
        console.error("Error al cargar pagos vencidos:", err);
        toast.error("No se pudieron cargar los pagos vencidos");
      }
    };

    fetchPagos();
  }, []);

  const columns = [
    {
      name: "Bodega",
      selector: (row) => row.warehouse?.code || "—",
      sortable: true,
      cell: (row) => <div className="text-center w-full">{row.warehouse?.code || "—"}</div>,
    },
    {
      name: "Cliente",
      selector: (row) => row.customer?.email || "—",
      sortable: true,
      cell: (row) => <div className="text-center w-full">{row.customer?.email || "—"}</div>,
    },
    {
      name: "Monto",
      selector: (row) => row.amount,
      sortable: true,
      cell: (row) => (
        <div className="text-center w-full">
          ${row.amount?.toLocaleString()} {row.currency?.toUpperCase()}
        </div>
      ),
    },
    {
      name: "Estado del pago",
      selector: (row) => row.payment_status,
      sortable: true,
      cell: (row) => {
        const status = row.payment_status;
        const statusMap = {
          paid: { label: "Pagado", color: "green" },
          pending: { label: "Pendiente", color: "yellow" },
        };
        const { label, color } = statusMap[status] || {
          label: "Desconocido",
          color: "gray",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium bg-${color}-100 text-${color}-700`}
          >
            {label}
          </span>
        );
      },
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

  return (
    <div className="p-4 bg-white shadow rounded-xl">
      {/* Título personalizado fuera del DataTable */}
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Pagos Vencidos</h1>

      <DataTable
        columns={columns}
        data={pagos}
        pagination
        striped
        highlightOnHover
        responsive
        customStyles={customStyles}
        noDataComponent="No hay pagos vencidos registrados"
      />
    </div>
  );
};

export default PagosVencidosList;
