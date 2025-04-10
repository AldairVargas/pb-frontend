import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const dataBodegas = [
  { tipo: "Ocupadas", cantidad: 80 },
  { tipo: "Libres", cantidad: 40 },
];

const dataUsuarios = [
  { estado: "Activos", value: 90 },
  { estado: "Inactivos", value: 30 },
];

const coloresUsuarios = ["#4ade80", "#f87171"];

const ReportesAdmin = () => {
  return (
    <div className="p-6 pt-20 md:pt-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Reportes</h1>

      {/* Card de resumen */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Total de Reportes Generados</h2>
          <p className="text-4xl font-bold text-blue-600">41</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Gráfica de barras */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Estado de Bodegas</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataBodegas}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tipo" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfica de pastel */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Estado de Usuarios</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataUsuarios}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              >
                {dataUsuarios.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={coloresUsuarios[index % coloresUsuarios.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportesAdmin;
