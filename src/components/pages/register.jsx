import React, { useState } from "react";
import { Warehouse, Eye, EyeClosed } from "lucide-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../../index.css";
import { Link } from "react-router-dom";
import useCRUD from "../../hooks/useCRUD";
import { toast } from "react-toastify";

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Nombre muy corto")
    .max(50, "Nombre muy largo")
    .required("Nombre es requerido"),
  lastName: Yup.string()
    .min(2, "Apellido muy corto")
    .max(50, "Apellido muy largo")
    .required("Apellido es requerido"),
  email: Yup.string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Formato de email inválido")
    .required("Email es requerido"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Número de teléfono debe tener 10 dígitos")
    .required("Teléfono es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Contraseña es requerida")
});

const MyRegister = ({ onSwitchForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { saveData } = useCRUD();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { firstName, lastName, ...rest } = values;
      const registerData = {
        first_name: firstName,
        last_name: lastName,
        role_id: 2,
        ...rest
      };
      
      const response = await saveData(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        'POST',
        registerData
      );

      if (response) {
        toast.success('Registro exitoso. Por favor, inicia sesión.');
        onSwitchForm();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error al registrar usuario');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-image flex items-center justify-center px-4 sm:px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Hero content */}
          <div className="flex-col items-start justify-center hidden md:flex">
            <div className="flex flex-row items-center justify-center text-white space-x-3 mb-18">
              <Link to={"/"}>
                <Warehouse className="w-8 md:w-12 h-8 md:h-12" />
              </Link>
              <Link to={"/"}>
                <h1 className="text-2xl md:text-4xl text-white text-center">
                  BodegaSegura
                </h1>
              </Link>
            </div>
            <h1 className="text-2xl md:text-4xl text-white text-start mt-10">
              Tu bodega, tu tranquilidad
            </h1>
            <p className="text-white font-semibold mt-10 opacity-100 text-sm md:text-base">
              En BodegaSegura entendemos la importancia de contar con un espacio
              seguro para almacenar tus bienes. Nuestras instalaciones cuentan
              con vigilancia 24/7, acceso controlado y condiciones óptimas para
              garantizar la seguridad de tus pertenencias.
            </p>
          </div>

          {/* Right side - Register form */}
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col w-full max-w-md bg-white rounded-lg p-4 md:p-8 shadow-md">
              {/* Logo for mobile */}
              <div className="flex md:hidden flex-row items-center justify-center text-black space-x-3 mb-8">
                <Warehouse className="w-8 h-8" />
                <h1 className="text-2xl text-center">BodegaSegura</h1>
              </div>

              <h3 className="text-black text-lg">Crear cuenta</h3>
              <h2 className="text-black font-semibold text-xl md:text-2xl mt-3">
                Regístrate para comenzar
              </h2>

              <div className="mt-8">
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: ""
                  }}
                  validationSchema={RegisterSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form className="w-full space-y-4">
                      {/* Nombre */}
                      <div className="relative z-0 w-full mb-5 group">
                        <Field
                          type="text"
                          name="firstName"
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.firstName && touched.firstName ? "border-red-500" : ""}`}
                          placeholder=" "
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Nombre
                        </label>
                        {errors.firstName && touched.firstName && (
                          <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                        )}
                      </div>

                      {/* Apellido */}
                      <div className="relative z-0 w-full mb-5 group">
                        <Field
                          type="text"
                          name="lastName"
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.lastName && touched.lastName ? "border-red-500" : ""}`}
                          placeholder=" "
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Apellido
                        </label>
                        {errors.lastName && touched.lastName && (
                          <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="relative z-0 w-full mb-5 group">
                        <Field
                          type="email"
                          name="email"
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.email && touched.email ? "border-red-500" : ""}`}
                          placeholder=" "
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Correo Electrónico
                        </label>
                        {errors.email && touched.email && (
                          <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                        )}
                      </div>

                      {/* Teléfono */}
                      <div className="relative z-0 w-full mb-5 group">
                        <Field
                          type="tel"
                          name="phone"
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.phone && touched.phone ? "border-red-500" : ""}`}
                          placeholder=" "
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Teléfono
                        </label>
                        {errors.phone && touched.phone && (
                          <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
                        )}
                      </div>

                      {/* Password */}
                      <div className="relative z-0 w-full mb-5 group">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer ${errors.password && touched.password ? "border-red-500 pr-20" : "pr-10"}`}
                          placeholder=" "
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                          Contraseña
                        </label>
                        <button
                          type="button"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeClosed /> : <Eye />}
                        </button>
                        {errors.password && touched.password && (
                          <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                        )}
                      </div>



                      {/* Botón REGISTRARSE */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-4 text-center mt-6 disabled:opacity-50"
                      >
                        {isSubmitting ? "Procesando..." : "REGISTRARSE"}
                      </button>

                      {/* Login link */}
                      <p className="text-center mt-4 text-sm">
                        ¿Ya tienes una cuenta?{" "}
                        <button
                          type="button"
                          onClick={onSwitchForm}
                          className="text-black font-medium hover:underline"
                        >
                          Inicia sesión
                        </button>
                      </p>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyRegister;
