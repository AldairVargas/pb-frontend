import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import estadosData from "../../assets/json/estados.json";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function ModalSaveSite({ isOpen, onClose, onSave, initialData }) {
  // Bloquea <script>, ( y )
  const noScriptOrParensRegex = /^(?!.*<script>)(?!.*[\(\)]).*$/i;

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Nombre requerido")
      .min(3, "Mínimo 3 caracteres")
      .max(100, "Máximo 100 caracteres")
      .matches(noScriptOrParensRegex, "No se permiten <script> ni paréntesis"),

    location: Yup.string()
      .required("Dirección requerida")
      .min(5, "Mínimo 5 caracteres")
      .max(200, "Máximo 200 caracteres")
      .matches(noScriptOrParensRegex, "No se permiten <script> ni paréntesis"),

    status: Yup.number()
      .required("Estatus requerido")
      .oneOf([0, 1], "Debe ser 0 (Inactivo) o 1 (Activo)"),

    state: Yup.number()
      .required("Estado requerido")
      .min(1, "Selecciona un estado válido"),

    municipality: Yup.number()
      .required("Municipio requerido")
      .min(1, "Selecciona un municipio válido"),
  });

  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    if (initialData && initialData.state) {
      const estadoNombre = Object.keys(estadosData)[initialData.state - 1];
      setMunicipios(estadosData[estadoNombre]);
    }
  }, [initialData]);

  const handleStateChange = (value, setFieldValue) => {
    const estadoNombre = Object.keys(estadosData)[value - 1];
    const municipiosList = estadosData[estadoNombre] || [];
    setMunicipios(municipiosList);
    setFieldValue("state", value);
    setFieldValue("municipality", "");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-xl overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {initialData ? "Editar sede" : "Registrar nueva sede"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <Formik
          initialValues={{
            name: initialData?.name || "",
            location: initialData?.location || "",
            status: initialData?.status ?? 1,
            state: initialData?.state || "",
            municipality: initialData?.municipality || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSave(values);
            setSubmitting(false);
          }}
          enableReinitialize
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form className="px-8 py-6 space-y-5">
              {/* Nombre */}
              <div>
                <Field
                  type="text"
                  name="name"
                  placeholder="Nombre de la sede"
                  className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Dirección */}
              <div>
                <Field
                  type="text"
                  name="location"
                  placeholder="Dirección"
                  className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="location" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Estatus */}
              <div>
                <Field
                  as="select"
                  name="status"
                  className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
                </Field>
                <ErrorMessage name="status" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Estado */}
              <div>
                <Field
                  as="select"
                  name="state"
                  onChange={(e) => handleStateChange(parseInt(e.target.value), setFieldValue)}
                  className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Selecciona un estado</option>
                  {Object.keys(estadosData).map((estado, index) => (
                    <option key={estado} value={index + 1}>
                      {estado}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Municipio */}
              <div>
                <Field
                  as="select"
                  name="municipality"
                  className="w-full h-12 rounded-lg border border-gray-300 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!municipios.length}
                >
                  <option value="">Selecciona un municipio</option>
                  {municipios.map((municipio, index) => (
                    <option key={municipio} value={index + 1}>
                      {municipio}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="municipality" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Botones */}
              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all disabled:opacity-60"
                >
                  {initialData ? "Guardar cambios" : "Guardar sede"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
