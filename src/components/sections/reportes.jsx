import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useCRUD from "../../hooks/useCRUD";

const COLORS_OCUPACION = ["#3b82f6", "#22c55e"];
const COLORS_ALERTAS = ["#facc15", "#ef4444"];

const Reportes = () => {
  const token = localStorage.getItem("token");
  const { data: bodegas, fetchData } = useCRUD(`${import.meta.env.VITE_API_URL}/warehouses`, {
    Authorization: `Bearer ${token}`,
  });

  const [dataOcupacion, setDataOcupacion] = useState([]);
  const [dataAlertas, setDataAlertas] = useState([]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (bodegas?.length) {
      const ocupadas = bodegas.filter((b) => b.status === "occupied").length;
      const libres = bodegas.filter((b) => b.status === "available").length;
      const vencidos = bodegas.filter((b) => b.status === "expired").length;
      const desalojos = bodegas.filter((b) => b.status === "evicted").length;

      setDataOcupacion([
        { name: "Ocupadas", value: ocupadas },
        { name: "Libres", value: libres },
      ]);

      setDataAlertas([
        { name: "Pagos Vencidos", value: vencidos },
        { name: "Desalojos", value: desalojos },
      ]);
    }
  }, [bodegas]);

  return (
    <div className="mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Reportes</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Ocupación */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Ocupación de Bodegas</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataOcupacion}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dataOcupacion.map((entry, index) => (
                  <Cell key={`cell-ocupacion-${index}`} fill={COLORS_OCUPACION[index % COLORS_OCUPACION.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Alertas */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Alertas de Sede</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataAlertas}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {dataAlertas.map((entry, index) => (
                  <Cell key={`cell-alertas-${index}`} fill={COLORS_ALERTAS[index % COLORS_ALERTAS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reportes;
