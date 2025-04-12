import React from "react";
import { AlertCircle, Info } from "lucide-react";

const pagosVencidos = [
  {
    id: 1,
    bodega: "Bodega A",
    cliente: "María López",
    fechaLimite: "2025-03-20",
    monto: "$1,200 MXN",
    diasRetraso: 11,
  },
  {
    id: 2,
    bodega: "Bodega B",
    cliente: "Carlos Pérez",
    fechaLimite: "2025-03-22",
    monto: "$1,800 MXN",
    diasRetraso: 9,
  },
  {
    id: 3,
    bodega: "Bodega C",
    cliente: "Laura Torres",
    fechaLimite: "2025-03-25",
    monto: "$950 MXN",
    diasRetraso: 6,
  },
];

const PagosVencidos = () => {
  return (
    <div className="mx-auto p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Pagos Vencidos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pagosVencidos.map((pago) => (
          <div
            key={pago.id}
            className="bg-white border border-yellow-100 rounded-xl shadow-sm hover:shadow-md transition p-6"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-yellow-600 font-semibold text-sm">
                <AlertCircle className="w-5 h-5" />
                {pago.diasRetraso} días de retraso
              </div>
              <span className="text-xs text-gray-400">{pago.fechaLimite}</span>
            </div>

            <h2 className="text-lg font-bold text-gray-800">{pago.bodega}</h2>
            <p className="text-sm text-gray-500 mb-1">
              Cliente: {pago.cliente}
            </p>
            <p className="text-sm text-gray-500 mb-4">Monto: {pago.monto}</p>

            <div className="flex flex-col md:flex-row gap-2">
              <button className="flex-1 px-3 py-1 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition">
                <Info className="w-4 h-4 mr-1 inline" /> Detalles
              </button>
              <button className="flex-1 px-3 py-1 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-600 hover:text-white transition">
                Desalojar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PagosVencidos;
