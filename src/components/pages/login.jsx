import React, { useState } from "react";
import { Warehouse, Eye, EyeClosed } from "lucide-react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "../../index.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useCRUD from "../../hooks/useCRUD";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email es requerido"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Contraseña es requerida"),
});

const recoveryEmailSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email requerido"),
});

const passwordResetSchema = Yup.object().shape({
  password: Yup.string()
    .required("Contraseña requerida")
    .min(6, "Mínimo 6 caracteres")
    .matches(/[A-Z]/, "Debe incluir una mayúscula")
    .matches(/[a-z]/, "Debe incluir una minúscula")
    .matches(/\d/, "Debe incluir un número")
    .matches(/[@$!%*?&]/, "Debe incluir un carácter especial"),
});

const MyLogin = ({ onSwitchForm }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(null);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [recoveryToken, setRecoveryToken] = useState("");
  const { saveData } = useCRUD();
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await saveData(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        "POST",
        values
      );

      if (response?.token) {
        const userRole = response.user.Role.role_name;
        const userData = {
          id: response.user.id,
          email: response.user.email,
          name: response.user.first_name,
          lastname: response.user.last_name,
          phone: response.user.phone,
          role: response.user.Role,
        };
        login(response.token, userRole, userData);
        toast.success("¡Bienvenido!");
        navigate(
          userRole === "Admin"
            ? "/dashboard"
            : userRole === "SuperAdmin"
            ? "/admin"
            : "/cliente"
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setSubmitting(false);
    }
  };

  const sendRecoveryCode = async () => {
    try {
      const response = await saveData(
        `${import.meta.env.VITE_API_URL}/auth/send-code`,
        "POST",
        { email: recoveryEmail }
      );

      const receivedToken = response.token;
      if (!receivedToken) throw new Error("Token no recibido del servidor");

      setRecoveryToken(receivedToken);
      toast.success("Código enviado al correo");
      setStep("code");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al enviar el código");
    }
  };

  const verifyCodeAndReset = async () => {
    try {
      await saveData(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        "POST",
        {
          token: recoveryToken,
          code: verificationCode,
          password: newPassword,
        }
      );

      toast.success("Contraseña restablecida");
      setStep(null);
      setRecoveryEmail("");
      setVerificationCode("");
      setNewPassword("");
      setRecoveryToken("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error al restablecer contraseña"
      );
    }
  };

  return (
    <div className="w-full min-h-screen bg-image flex items-center justify-center px-4 sm:px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex-col items-start justify-center hidden md:flex">
            <div className="flex flex-row items-center justify-center text-white space-x-3 mb-18">
              <Link to="/">
                <Warehouse className="w-8 md:w-12 h-8 md:h-12" />
              </Link>
              <Link to="/">
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
              seguro para almacenar tus bienes...
            </p>
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col w-full max-w-md bg-white rounded-lg p-4 md:p-8 shadow-md">
              <div className="flex md:hidden flex-row items-center justify-center text-black space-x-3 mb-8">
                <Warehouse className="w-8 h-8" />
                <h1 className="text-2xl text-center">BodegaSegura</h1>
              </div>

              <h3 className="text-black text-lg">Bienvenido</h3>
              <h2 className="text-black font-semibold text-xl md:text-2xl mt-3">
                Inicia sesión con tu cuenta
              </h2>

              <div className="mt-8">
                <Formik
                  initialValues={{ email: "", password: "" }}
                  validationSchema={LoginSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form className="w-full space-y-6">
                      <div className="relative z-0 w-full mb-8 group">
                        <Field
                          type="email"
                          name="email"
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${
                            errors.email && touched.email
                              ? "border-red-500 pr-10"
                              : "border-gray-300"
                          }`}
                          placeholder=" "
                        />
                        <label htmlFor="email" className="form-label">
                          Correo Electrónico
                        </label>
                        {errors.email && touched.email && (
                          <div className="text-sm text-red-500 mt-1">{errors.email}</div>
                        )}
                      </div>

                      <div className="relative z-0 w-full mb-5 group">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${
                            errors.password && touched.password
                              ? "border-red-500 pr-10"
                              : "border-gray-300"
                          }`}
                          placeholder=" "
                        />
                        <label htmlFor="password" className="form-label">
                          Contraseña
                        </label>
                        <div
                          className="absolute right-4 top-2.5 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeClosed /> : <Eye />}
                        </div>
                        {errors.password && touched.password && (
                          <div className="text-sm text-red-500 mt-1">{errors.password}</div>
                        )}
                      </div>

                      <div className="flex flex-row items-center mb-3">
                        <button
                          type="button"
                          onClick={() => setStep("email")}
                          className="ml-auto text-sm text-black hover:text-gray-500"
                        >
                          ¿Olvidaste tu contraseña?
                        </button>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="text-white bg-black hover:bg-gray-800 font-medium rounded-lg text-sm w-full px-5 py-4 text-center mt-6 disabled:opacity-50"
                      >
                        {isSubmitting ? "Procesando..." : "CONTINUAR"}
                      </button>

                      <p className="text-center mt-4 text-sm">
                        ¿No tienes una cuenta?{" "}
                        <button
                          type="button"
                          onClick={onSwitchForm}
                          className="text-black font-medium hover:underline"
                        >
                          Regístrate
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

      {/* Modal: Recuperar contraseña */}
      {step === "email" && (
        <Modal onClose={() => setStep(null)} title="Recuperar contraseña">
          <Formik
            initialValues={{ email: recoveryEmail }}
            validationSchema={recoveryEmailSchema}
            onSubmit={(values) => {
              setRecoveryEmail(values.email);
              sendRecoveryCode();
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Field
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  className="input w-full mb-2 border border-gray-300 rounded px-3 py-2"
                />
                {errors.email && touched.email && (
                  <div className="text-sm text-red-500 mb-2">{errors.email}</div>
                )}
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                  Enviar código
                </button>
              </Form>
            )}
          </Formik>
        </Modal>
      )}

      {/* Modal: Código */}
      {step === "code" && (
        <Modal onClose={() => setStep(null)} title="Verificar código">
          <input
            type="text"
            placeholder="Código recibido"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="input w-full mb-4 border border-gray-300 rounded px-3 py-2"
          />
          <button
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            onClick={() => setStep("password")}
          >
            Verificar
          </button>
        </Modal>
      )}

      {/* Modal: Nueva contraseña */}
      {step === "password" && (
        <Modal onClose={() => setStep(null)} title="Nueva contraseña">
          <Formik
            initialValues={{ password: newPassword }}
            validationSchema={passwordResetSchema}
            onSubmit={(values) => {
              setNewPassword(values.password);
              verifyCodeAndReset();
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="relative mb-4">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Nueva contraseña"
                    className="input w-full border border-gray-300 rounded px-3 py-2 pr-10"
                  />
                  <div
                    className="absolute right-3 top-2.5 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                  </div>
                  {errors.password && touched.password && (
                    <div className="text-sm text-red-500 mt-1">{errors.password}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
                >
                  Cambiar contraseña
                </button>
              </Form>
            )}
          </Formik>
        </Modal>
      )}
    </div>
  );
};

const Modal = ({ title, children, onClose }) => (
  <>
    <div className="fixed inset-0 bg-black/50 z-40"></div>
    <div className="fixed z-50 inset-0 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4 text-center border-b pb-2">
          {title}
        </h2>
        {children}
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:underline"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </>
);

export default MyLogin;
