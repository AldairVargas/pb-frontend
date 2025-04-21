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

const COLORS_OCUPACION = ["#3b82f6", "#22c55e"]; // Azul y verde

const Reportes = () => {
  const token = localStorage.getItem("token");
  const { data: bodegas, fetchData } = useCRUD(`${import.meta.env.VITE_API_URL}/warehouses`, {
    Authorization: `Bearer ${token}`,
  });

  const [dataOcupacion, setDataOcupacion] = useState([]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (bodegas?.length) {
      const ocupadas = bodegas.filter((b) => b.status === "occupied").length;
      const libres = bodegas.filter((b) => b.status === "available").length;

      setDataOcupacion([
        { name: "Ocupadas", value: ocupadas },
        { name: "Libres", value: libres },
      ]);
    }
  }, [bodegas]);

  return (
    <div className="mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Reportes</h1>

      <div className="bg-white rounded-xl shadow-md p-6 max-w-xl mx-auto">
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
                <Cell
                  key={`cell-ocupacion-${index}`}
                  fill={COLORS_OCUPACION[index % COLORS_OCUPACION.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reportes;
