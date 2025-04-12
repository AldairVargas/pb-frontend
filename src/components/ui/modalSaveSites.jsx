import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ModalSaveSite({ isOpen, onClose, onSave }) {
  const initialState = {
    name: "",
    location: "",
    status: 1,
    state: "",
    municipality: ""
  };

  const [formData, setFormData] = useState(initialState);

  const handleClose = () => {
    setFormData(initialState);
    onClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Registrar nueva sede</h2>
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
            onChange={handleInputChange}
            className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={150}
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Dirección"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            maxLength={200}
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value={1}>Activo</option>
            <option value={0}>Inactivo</option>
          </select>

          <input
            type="number"
            name="state"
            placeholder="ID del Estado"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="number"
            name="municipality"
            placeholder="ID del Municipio"
            value={formData.municipality}
            onChange={handleInputChange}
            className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

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
              Guardar sede
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
