import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ModalSaveWarehouse({ isOpen, onClose, onSave }) {
  const initialState = {
    code: "",
    dimensions: "",
    monthly_price: "",
    status: "available",
    site_id: "",
    photos: Array(5).fill(null),
  };

  const [formData, setFormData] = useState(initialState);
  const [previews, setPreviews] = useState(Array(5).fill(null));

  const handleClose = () => {
    setFormData(initialState);
    setPreviews(Array(5).fill(null));
    onClose();
  };

  const onDrop = useCallback((acceptedFiles, photoIndex) => {
    const reader = new FileReader();
    reader.onload = () => {
      setPreviews((prev) => {
        const newPreviews = [...prev];
        newPreviews[photoIndex] = reader.result;
        return newPreviews;
      });
      setFormData((prev) => {
        const newPhotos = [...prev.photos];
        newPhotos[photoIndex] = acceptedFiles[0];
        return { ...prev, photos: newPhotos };
      });
    };
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);

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
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-5xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            Registrar nueva bodega
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <form className="px-8 py-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Código
              </label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={15}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Dimensiones
              </label>
              <input
                type="text"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={50}
                min={5}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Precio mensual
              </label>
              <input
                type="number"
                name="monthly_price"
                value={formData.monthly_price}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.01"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Estado
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="available">Disponible</option>
                <option value="occupied">Ocupada</option>
                <option value="expired">Expirada</option>
                <option value="evicted">Desalojada</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                ID del sitio
              </label>
              <input
                type="number"
                name="site_id"
                value={formData.site_id}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Fotos
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {previews.map((preview, index) => (
                <div
                  key={index}
                  className={`border-2 border-dashed rounded-lg p-2 h-32 flex items-center justify-center relative cursor-pointer ${
                    preview
                      ? "border-blue-500"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onClick={() =>
                    document.getElementById(`photo-input-${index}`).click()
                  }
                >
                  {preview ? (
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-xs text-gray-500 text-center">
                      Click para subir <br /> foto {index + 1}
                    </span>
                  )}
                  <input
                    id={`photo-input-${index}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => onDrop([e.target.files[0]], index)}
                    required
                  />
                </div>
              ))}
            </div>
          </div>

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
                handleClose();
              }}
            >
              Guardar bodega
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
