import React, { useEffect, useMemo } from "react";
import {
  Building2,
  Warehouse,
  AlarmClock,
  Ban,
  CheckCircle,
} from "lucide-react";
import useCRUD from "../../hooks/useCRUD";

const DashboardSede = () => {
  const {
    data: bodegas,
    fetchData,
    loading,
  } = useCRUD(`${import.meta.env.VITE_API_URL}/warehouses`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const stats = useMemo(() => {
    if (!bodegas || bodegas.length === 0) return [];

    const total = bodegas.length;
    const ocupadas = bodegas.filter((b) => b.status === "occupied").length;
    const libres = bodegas.filter((b) => b.status === "available").length;

    return [
      {
        title: "Bodegas Totales",
        value: total,
        icon: <Building2 className="w-8 h-8 text-blue-600" />,
        bg: "bg-blue-50",
      },
      {
        title: "Bodegas Ocupadas",
        value: ocupadas,
        icon: <Warehouse className="w-8 h-8 text-green-600" />,
        bg: "bg-green-50",
      },
      {
        title: "Bodegas Libres",
        value: libres,
        icon: <CheckCircle className="w-8 h-8 text-cyan-600" />,
        bg: "bg-cyan-50",
      }
    ];
  }, [bodegas]);

  return (
    <div className="p-6 bg-gray-50 pt-20 md:pt-0 px-4">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">Dashboard</h1>

      {loading ? (
        <p className="text-gray-500">Cargando estadísticas...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((item, index) => (
            <div
              key={index}
              className={`rounded-2xl ${item.bg} p-6 shadow-sm hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-white rounded-full shadow-sm">{item.icon}</div>
                <span className="text-gray-400 text-sm font-semibold uppercase">
                  {item.title}
                </span>
              </div>
              <p className="text-4xl font-bold text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardSede;
