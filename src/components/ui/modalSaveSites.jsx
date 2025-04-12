import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import estadosData from "../../assets/json/estados.json";

export default function ModalSaveSite({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    status: 1,
    state: "",
    municipality: ""
  });

  const [selectedStateName, setSelectedStateName] = useState("");
  const [municipios, setMunicipios] = useState([]);

  // Cargar municipios si es edición
  useEffect(() => {
    if (initialData) {
      const estadoEncontrado = Object.entries(estadosData).find(([_, municipios]) =>
        municipios.includes(initialData.municipality)
      );

      const stateName = estadoEncontrado ? estadoEncontrado[0] : "";
      setSelectedStateName(stateName);
      setMunicipios(estadoEncontrado ? estadosData[stateName] : []);

      const stateId = Object.keys(estadosData).indexOf(stateName) + 1;
      const municipioId = estadoEncontrado
        ? estadosData[stateName].indexOf(initialData.municipality) + 1
        : "";

      setFormData({
        name: initialData.name || "",
        location: initialData.location || "",
        status: parseInt(initialData.status),
        state: stateId,
        municipality: municipioId,
      });
    } else {
      setFormData({
        name: "",
        location: "",
        status: 1,
        state: "",
        municipality: ""
      });
      setSelectedStateName("");
      setMunicipios([]);
    }
  }, [initialData, isOpen]);

  const handleClose = () => {
    onClose();
    setFormData({
      name: "",
      location: "",
      status: 1,
      state: "",
      municipality: ""
    });
    setSelectedStateName("");
    setMunicipios([]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      const selectedName = Object.keys(estadosData)[value - 1]; // ID = index + 1
      setSelectedStateName(selectedName);
      setMunicipios(estadosData[selectedName]);
      setFormData((prev) => ({
        ...prev,
        state: value,
        municipality: ""
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  if (!isOpen) return null;

  const isEdit = !!initialData;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEdit ? "Editar sede" : "Registrar nueva sede"}
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form className="px-8 py-6 space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Nombre de la sede"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Dirección"
            value={formData.location}
            onChange={handleChange}
            className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>

          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecciona un estado</option>
            {Object.keys(estadosData).map((estado, index) => (
              <option key={estado} value={index + 1}>
                {estado}
              </option>
            ))}
          </select>

          <select
            name="municipality"
            value={formData.municipality}
            onChange={handleChange}
            className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={!municipios.length}
          >
            <option value="">Selecciona un municipio</option>
            {municipios.map((municipio, index) => (
              <option key={municipio} value={index + 1}>
                {municipio}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all"
              onClick={(e) => {
                e.preventDefault();
                onSave(formData);
              }}
            >
              {isEdit ? "Guardar cambios" : "Guardar sede"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
