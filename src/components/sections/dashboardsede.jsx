import React from "react";
import {
  Building2,
  Warehouse,
  AlarmClock,
  Ban,
  CheckCircle,
} from "lucide-react";

const stats = [
  {
    title: "Bodegas Totales",
    value: 120,
    icon: <Building2 className="w-8 h-8 text-blue-600" />,
    bg: "bg-blue-50",
  },
  {
    title: "Bodegas Ocupadas",
    value: 80,
    icon: <Warehouse className="w-8 h-8 text-green-600" />,
    bg: "bg-green-50",
  },
  {
    title: "Bodegas Libres",
    value: 30,
    icon: <CheckCircle className="w-8 h-8 text-cyan-600" />,
    bg: "bg-cyan-50",
  },
  {
    title: "Pagos Vencidos",
    value: 10,
    icon: <AlarmClock className="w-8 h-8 text-yellow-600" />,
    bg: "bg-yellow-50",
  },
  {
    title: "Desalojos Realizados",
    value: 5,
    icon: <Ban className="w-8 h-8 text-red-600" />,
    bg: "bg-red-50",
  },
];

const dashboardsede = () => {
  return (
    <div className="p-6 bg-gray-50 pt-20 md:pt-0 px-4">
      <h1 className="text-4xl font-extrabold text-blue-600 mb-6">
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

export default dashboardsede;
