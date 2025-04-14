import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays } from "date-fns";
import axios from "axios";
import { toast } from "react-toastify";

export default function ModalRent({ isOpen, onClose, userId, warehouseId }) {
  const [step, setStep] = useState(1);

  const initialValues = {
    start_date: format(new Date(), "yyyy-MM-dd"),
    expiration_date: format(addDays(new Date(), 30), "yyyy-MM-dd"),
    card_number: "",
    card_expiry: "",
    cvv: "",
    status: "active",
    user_id: userId,
    warehouse_id: warehouseId,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("token");
      const rentData = {
        start_date: values.start_date,
        expiration_date: values.expiration_date,
        status: values.status,
        user_id: values.user_id,
        warehouse_id: values.warehouse_id,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/rents`, rentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Renta creada exitosamente");
      onClose();
    } catch (error) {
      toast.error("Error al crear la renta");
      console.error("Error creando renta:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white shadow-xl rounded-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800">
                {step === 1 ? "Seleccionar fecha" : "Método de pago"}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              {({ values, setFieldValue, isSubmitting }) => (
                <Form className="p-6">
                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step1"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de inicio
                          </label>
                          <Field
                            type="date"
                            name="start_date"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            onChange={(e) => {
                              const startDate = new Date(e.target.value);
                              setFieldValue("start_date", e.target.value);
                              setFieldValue(
                                "expiration_date",
                                format(addDays(startDate, 30), "yyyy-MM-dd")
                              );
                            }}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Fecha de expiración
                          </label>
                          <input
                            type="date"
                            value={values.expiration_date}
                            disabled
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-gray-50"
                          />
                        </div>

                        <div className="flex justify-end mt-6">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                          >
                            Siguiente
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="step2"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        className="space-y-4"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Número de tarjeta
                          </label>
                          <Field
                            type="text"
                            name="card_number"
                            placeholder="1234 5678 9012 3456"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Fecha de expiración
                            </label>
                            <Field
                              type="text"
                              name="card_expiry"
                              placeholder="MM/YY"
                              className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <Field
                              type="text"
                              name="cvv"
                              placeholder="123"
                              className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            />
                          </div>
                        </div>

                        <div className="flex justify-between mt-6">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                          >
                            Anterior
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                          >
                            {isSubmitting ? "Procesando..." : "Rentar bodega"}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Form>
              )}
            </Formik>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
