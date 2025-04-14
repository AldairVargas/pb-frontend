import React, { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import useCRUD from "../../hooks/useCRUD";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MisReservas = () => {
  const [rentas, setRentas] = useState([]);
  const [bodegas, setBodegas] = useState({});
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ show: false, renta: null });
  const fetchedRef = useRef(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const { readItem, deleteData } = useCRUD("", {
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

  const handleEliminar = async () => {
    if (!modal.renta) return;

    try {
      await deleteData(
        `${import.meta.env.VITE_API_URL}/rents/${modal.renta.rent_id}`,
        { Authorization: `Bearer ${token}` }
      );

      toast.success("Reserva cancelada correctamente");
      setRentas((prev) =>
        prev.filter((r) => r.rent_id !== modal.renta.rent_id)
      );
      setModal({ show: false, renta: null });
    } catch (error) {
      console.error("Error al eliminar renta:", error);
      toast.error("No se pudo cancelar la reserva");
    }
  };

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
    <>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {rentas.map((renta) => {
          const bodega = bodegas[renta.warehouse_id];
          if (!bodega) return null;

          return (
            <div
              key={renta.rent_id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden group"
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
                  🗓️ Inicio: {new Date(renta.start_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500">
                  🔚 Fin:{" "}
                  {new Date(renta.expiration_date).toLocaleDateString()}
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                    Renta activa
                  </span>
                </div>

                <button
                  onClick={() => setModal({ show: true, renta })}
                  className="w-full mt-3 px-4 py-2 text-sm text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition"
                >
                  Cancelar reserva
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal de confirmación */}
      {modal.show && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              ¿Cancelar esta reserva?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Esta acción no se puede deshacer. ¿Estás seguro de eliminar esta
              renta?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setModal({ show: false, renta: null })}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleEliminar}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MisReservas;
