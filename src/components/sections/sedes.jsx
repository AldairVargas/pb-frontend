import React, { useEffect } from "react";
import useCRUD from "../../hooks/useCRUD";

const SedesAdmin = () => {
  const { data: sedes, fetchData } = useCRUD(`${import.meta.env.VITE_API_URL}/sites`);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-6 pt-20 md:pt-8">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Sedes</h1>
      <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 text-base border-b border-gray-200">
              <th className="px-6 py-4 font-semibold">Nombre</th>
              <th className="px-6 py-4 font-semibold">Dirección</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-base">
            {sedes?.map((sede) => (
              <tr key={sede.site_id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="px-6 py-4">{sede.name}</td>
                <td className="px-6 py-4">{sede.location}</td>
                <td className="px-6 py-4">{sede.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SedesAdmin;
