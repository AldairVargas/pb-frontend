import React, { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import useCRUD from "../../hooks/useCRUD";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MisReservas = () => {
  const [rentas, setRentas] = useState([]);
  const [bodegas, setBodegas] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchedRef = useRef(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { readItem } = useCRUD("", {
    Authorization: `Bearer ${token}`,
  });

  useEffect(() => {
    const fetchRentas = async () => {
      if (fetchedRef.current) return;
      fetchedRef.current = true;

      if (!token) {
        toast.error("No tienes sesión activa");
        setLoading(false);
        return;
      }

      try {
        const { id: userId } = jwtDecode(token);
        const data = await readItem(`${import.meta.env.VITE_API_URL}/rents`);

        const rentasDelUsuario = data.filter((r) => r.user_id === userId);
        setRentas(rentasDelUsuario);

        const bodegaData = {};
        await Promise.all(
          rentasDelUsuario.map(async (renta) => {
            const bodega = await readItem(
              `${import.meta.env.VITE_API_URL}/warehouses/${renta.warehouse_id}`
            );
            bodegaData[renta.warehouse_id] = bodega;
          })
        );
        setBodegas(bodegaData);
      } catch (error) {
        console.error("Error al obtener rentas:", error);
        toast.error("No se pudieron cargar tus reservas");
      } finally {
        setLoading(false);
      }
    };

    fetchRentas();
  }, [readItem, token]);

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
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {rentas.map((renta) => {
        const bodega = bodegas[renta.warehouse_id];
        if (!bodega) return null;

        const inicio = new Date(renta.start_date).toLocaleDateString("es-MX");
        const fin = new Date(renta.expiration_date).toLocaleDateString("es-MX");

        return (
          <div
            key={renta.rent_id}
            onClick={() => navigate(`/warehouse/${bodega.warehouse_id}`)}
            className="cursor-pointer bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
          >
            <img
              src={`data:image/jpeg;base64,${bodega.photo1}`}
              alt="Bodega"
              className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4 space-y-1">
              <h3 className="text-lg font-bold text-blue-600">
                Bodega {bodega.code}
              </h3>
              <p className="text-sm text-gray-500">
                📍 {bodega.Site?.name || "Ubicación desconocida"}
              </p>
              <p className="text-sm text-gray-500">
                📦 {bodega.dimensions || "Tamaño no especificado"}
              </p>
              <p className="text-sm text-gray-500">
                💰 ${bodega.monthly_price} / mes
              </p>
              <p className="text-sm text-gray-500">
                📅 Inicio: {inicio}
              </p>
              <p className="text-sm text-gray-500">
                ⏳ Fin: {fin}
              </p>
              <div className="mt-2 flex flex-wrap gap-1 text-xs text-gray-700">
                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  Renta activa
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MisReservas;
