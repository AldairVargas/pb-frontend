import React, { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import useCRUD from "../../hooks/useCRUD";
import { toast } from "react-toastify";

const MisReservas = () => {
  const [rentas, setRentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false); // <- Para evitar re-render infinitos
  const { readItem } = useCRUD();

  useEffect(() => {
    const fetchRentas = async () => {
      if (fetchedRef.current) return; // ✅ evita llamadas duplicadas
      fetchedRef.current = true;

      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const { id: userId } = jwtDecode(token);

        const data = await readItem(`${import.meta.env.VITE_API_URL}/rents`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const rentasDelUsuario = data.filter((r) => r.user_id === userId);
        setRentas(rentasDelUsuario);
      } catch (error) {
        console.error("Error al obtener rentas:", error);
        toast.error("No se pudieron cargar tus reservas");
      } finally {
        setLoading(false);
      }
    };

    fetchRentas();
  }, [readItem]);

  if (loading) {
    return (
      <div className="text-center p-6 text-gray-500">
        Cargando tus reservas...
      </div>
    );
  }

  if (rentas.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow text-center text-gray-600">
        No tienes reservas aún.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {rentas.map((renta) => (
        <div key={renta.rent_id} className="bg-white rounded-lg shadow overflow-hidden">
          <img
            src={`data:image/jpeg;base64,${renta.warehouse?.photo1}`}
            alt="Foto de bodega"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-blue-600 mb-1">
              Bodega {renta.warehouse?.code}
            </h3>
            <p className="text-gray-700">
              Ubicación: {renta.warehouse?.Site?.name}
            </p>
            <p className="text-gray-700">
              Precio mensual: ${renta.warehouse?.monthly_price}
            </p>
            <p className="text-gray-700">
              Estado:{" "}
              <span
                className={`font-medium ${
                  renta.warehouse?.status === "available"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {renta.warehouse?.status === "available"
                  ? "Disponible"
                  : "Ocupada"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MisReservas;
