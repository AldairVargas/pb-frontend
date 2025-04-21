import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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

  const validationSchema = Yup.object({
    card_number: Yup.string()
      .required("Número de tarjeta requerido")
      .matches(/^\d{16}$/, "Debe contener exactamente 16 dígitos numéricos"),
    card_expiry: Yup.string()
      .required("Fecha de expiración requerida")
      .matches(/^(0[1-9]|1[0-2])\d{2}$/, "Formato inválido. Usa MMYY")
      .length(4, "Debe tener exactamente 4 dígitos"),

    cvv: Yup.string()
      .required("CVV requerido")
      .matches(/^\d{3}$/, "Debe contener exactamente 3 dígitos"),
  });

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

      setTimeout(() => {
        window.location.reload();
      }, 500);
    } catch (error) {
      console.error("Error creando renta:", error);
      toast.error("Error al crear la renta");
    } finally {
      setSubmitting(false);
    }
  };

  const onlyNumbers = (e) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];
    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white shadow-xl rounded-2xl w-full max-w-lg overflow-hidden"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
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

            <Formik
              initialValues={initialValues}
              validationSchema={step === 2 ? validationSchema : null}
              onSubmit={handleSubmit}
            >
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
                            name="card_number"
                            type="text"
                            maxLength="16"
                            inputMode="numeric"
                            pattern="\d*"
                            onKeyDown={onlyNumbers}
                            placeholder="1234567812345678"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2"
                          />
                          <ErrorMessage
                            name="card_number"
                            component="div"
                            className="text-red-500 text-sm mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Fecha de expiración
                            </label>
                            <Field
                              name="card_expiry"
                              type="text"
                              maxLength="4"
                              inputMode="numeric"
                              pattern="\d*"
                              onKeyDown={onlyNumbers}
                              placeholder="MMYY"
                              className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            />
                            <ErrorMessage
                              name="card_expiry"
                              component="div"
                              className="text-red-500 text-sm mt-1"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <Field
                              name="cvv"
                              type="text"
                              maxLength="3"
                              inputMode="numeric"
                              pattern="\d*"
                              onKeyDown={onlyNumbers}
                              placeholder="123"
                              className="w-full rounded-lg border border-gray-300 px-4 py-2"
                            />
                            <ErrorMessage
                              name="cvv"
                              component="div"
                              className="text-red-500 text-sm mt-1"
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
