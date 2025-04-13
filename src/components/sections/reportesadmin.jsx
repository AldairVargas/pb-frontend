import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import useCRUD from "../../hooks/useCRUD";

const COLORS_OCUPACION = ["#3b82f6", "#22c55e"];
const COLORS_ALERTAS = ["#facc15", "#ef4444"];
const COLORS_USUARIOS = ["#4ade80", "#f87171"];

const ReportesAdmin = () => {
  const token = localStorage.getItem("token");

  const { data: bodegas, fetchData: fetchBodegas } = useCRUD(`${import.meta.env.VITE_API_URL}/warehouses`, {
    Authorization: `Bearer ${token}`,
  });

  const { data: usuarios, fetchData: fetchUsuarios } = useCRUD(`${import.meta.env.VITE_API_URL}/users`, {
    Authorization: `Bearer ${token}`,
  });

  const [dataOcupacion, setDataOcupacion] = useState([]);
  const [dataAlertas, setDataAlertas] = useState([]);
  const [dataUsuarios, setDataUsuarios] = useState([]);
  const [totalBodegas, setTotalBodegas] = useState(0);
  const [totalUsuarios, setTotalUsuarios] = useState(0);

  useEffect(() => {
    fetchBodegas();
    fetchUsuarios();
  }, [fetchBodegas, fetchUsuarios]);

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

      setTotalBodegas(bodegas.length);
    }
  }, [bodegas]);

  useEffect(() => {
    if (usuarios?.length) {
      const activos = usuarios.filter((u) => u.active).length;
      const inactivos = usuarios.length - activos;

      setDataUsuarios([
        { estado: "Activos", value: activos },
        { estado: "Inactivos", value: inactivos },
      ]);

      setTotalUsuarios(usuarios.length);
    }
  }, [usuarios]);

  return (
    <div className="p-6 pt-20 md:pt-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Reportes Globales</h1>

      {/* Resumen */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Total de Bodegas</h2>
          <p className="text-4xl font-bold text-blue-600">{totalBodegas}</p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition">
          <h2 className="text-lg font-semibold text-gray-600 mb-2">Total de Usuarios</h2>
          <p className="text-4xl font-bold text-blue-600">{totalUsuarios}</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ocupación de bodegas */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Ocupación de Bodegas</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataOcupacion}
                cx="50%"
                cy="50%"
                outerRadius={80}
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
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
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Alertas en Bodegas</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataAlertas}
                cx="50%"
                cy="50%"
                outerRadius={80}
                labelLine={false}
                label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
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

        {/* Estado de Usuarios */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Estado de Usuarios</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataUsuarios}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="estado" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {dataUsuarios.map((entry, index) => (
                  <Cell key={`cell-usuarios-${index}`} fill={COLORS_USUARIOS[index % COLORS_USUARIOS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ReportesAdmin;
