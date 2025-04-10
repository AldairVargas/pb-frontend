import React, { useEffect, useState } from "react";
import { Users, Building, Boxes } from "lucide-react";
import useCRUD from "../../hooks/useCRUD";

const Dashboard = () => {
  const { data: usuarios, fetchData: fetchUsuarios } = useCRUD(`${import.meta.env.VITE_API_URL}/users`);
  const { data: sedes, fetchData: fetchSedes } = useCRUD(`${import.meta.env.VITE_API_URL}/sites`);
  const { data: almacenes, fetchData: fetchAlmacenes } = useCRUD(`${import.meta.env.VITE_API_URL}/warehouses`);

  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchUsuarios();
    fetchSedes();
    fetchAlmacenes();
  }, [fetchUsuarios, fetchSedes, fetchAlmacenes]);

  useEffect(() => {
    setStats([
      {
        title: "Usuarios",
        value: usuarios?.length || 0,
        icon: <Users className="w-8 h-8 text-blue-600" />,
        bg: "bg-blue-50",
      },
      {
        title: "Sedes",
        value: sedes?.length || 0,
        icon: <Building className="w-8 h-8 text-green-600" />,
        bg: "bg-green-50",
      },
      {
        title: "Almacenes",
        value: almacenes?.length || 0,
        icon: <Boxes className="w-8 h-8 text-cyan-600" />,
        bg: "bg-cyan-50",
      },
    ]);
  }, [usuarios, sedes, almacenes]);

  return (
    <div className="p-6 bg-gray-50 pt-20 md:pt-0 px-4">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className={`rounded-2xl ${item.bg} p-6 shadow-sm hover:shadow-md transition-all duration-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white rounded-full shadow-sm">
                {item.icon}
              </div>
              <span className="text-gray-400 text-sm font-semibold uppercase">
                {item.title}
              </span>
            </div>
            <p className="text-4xl font-bold text-gray-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
