import React from "react";

const sedes = [
  {
    nombre: "Sede Cuernavaca",
    direccion: "Av. Morelos #123, Cuernavaca, Mor.",
    responsable: "Laura Martínez",
    bodegas: 12,
  },
  {
    nombre: "Sede Temixco",
    direccion: "Blvd. Emiliano Zapata #45, Temixco, Mor.",
    responsable: "José Ramírez",
    bodegas: 7,
  },
  {
    nombre: "Sede Jiutepec",
    direccion: "Calle Reforma #200, Jiutepec, Mor.",
    responsable: "Claudia Ortega",
    bodegas: 15,
  },
];

const SedesAdmin = () => {
  return (
    <div className="p-6 pt-20 md:pt-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Sedes</h1>

      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 text-base border-b border-gray-200">
              <th className="px-6 py-4 font-semibold">Nombre</th>
              <th className="px-6 py-4 font-semibold">Dirección</th>
              <th className="px-6 py-4 font-semibold">Responsable</th>
              <th className="px-6 py-4 font-semibold">Bodegas</th>
              <th className="px-6 py-4 text-center font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-base">
            {sedes.map((sede, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4">{sede.nombre}</td>
                <td className="px-6 py-4">{sede.direccion}</td>
                <td className="px-6 py-4">{sede.responsable}</td>
                <td className="px-6 py-4">{sede.bodegas}</td>
                <td className="px-6 py-4 text-center space-x-3">
                  <button className="text-blue-600 hover:underline font-medium">
                    Editar
                  </button>
                  <button className="text-red-600 hover:underline font-medium">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SedesAdmin;
