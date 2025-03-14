import React, { useState } from "react";
import { Warehouse, Eye, EyeClosed } from "lucide-react";
import "../../index.css";
import { Link } from "react-router-dom";

const MyLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="w-full min-h-screen bg-image flex items-center justify-center px-4 sm:px-6 md:px-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left side - Hero content */}
          <div className="flex flex-col items-start justify-center hidden md:flex">
            <div className="flex flex-row items-center justify-center text-white space-x-3 mb-18">
              <Warehouse className="w-8 md:w-12 h-8 md:h-12" />
              <h1 className="text-2xl md:text-4xl text-white text-center">BodegaSegura</h1>
            </div>
            <h1 className="text-2xl md:text-4xl text-white text-start mt-10">
              Tu bodega, tu tranquilidad
            </h1>
            <p className="text-white mt-10 text-sm md:text-base">
              En BodegaSegura entendemos la importancia de contar con un espacio
              seguro para almacenar tus bienes. Nuestras instalaciones cuentan
              con vigilancia 24/7, acceso controlado y condiciones óptimas para
              garantizar la seguridad de tus pertenencias. Ya sea para uso
              personal o comercial, tenemos la solución de almacenamiento
              perfecta para ti. Descubre la tranquilidad de saber que tus
              objetos están protegidos en todo momento.
            </p>
          </div>

          {/* Right side - Login form */}
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-col w-full max-w-md bg-white rounded-lg p-4 md:p-8 shadow-md">
              {/* Logo for mobile */}
              <div className="flex md:hidden flex-row items-center justify-center text-black space-x-3 mb-8">
                <Warehouse className="w-8 h-8" />
                <h1 className="text-2xl text-center">BodegaSegura</h1>
              </div>

              <h3 className="text-black text-lg">Bienvenido</h3>
              <h2 className="text-black font-semibold text-xl md:text-2xl mt-3">
                Inicia sesión con tu cuenta
              </h2>

              <div className="mt-8">
                <form className="w-full space-y-6">
                  {/* Email */}
                  <div className="relative z-0 w-full mb-8 group">
                    <input
                      type="email"
                      name="floating_email"
                      id="floating_email"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_email"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Email address
                    </label>
                  </div>

                  {/* Password */}
                  <div className="relative z-0 w-full mb-5 group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="floating_password"
                      id="floating_password"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-black peer"
                      placeholder=" "
                      required
                    />
                    <label
                      htmlFor="floating_password"
                      className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeClosed /> : <Eye />}
                    </button>
                  </div>

                  {/* Remember me & Forgot Password */}
                  <div className="flex flex-row items-center mb-5">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-4 h-4 text-gray-500 bg-gray-100 rounded border-gray-300 focus:ring-gray-500"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 text-sm font-medium text-black"
                    >
                      Remember me
                    </label>
                    <Link
                      to="/"
                      className="ml-auto text-sm text-black hover:text-gray-500"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  {/* Botón CONTINUAR */}
                  <button
                    type="submit"
                    className="text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-4 text-center mt-6"
                  >
                    CONTINUAR
                  </button>

                  {/* Registration link */}
                  <p className="text-center mt-4 text-sm">
                    ¿No tienes una cuenta?{" "}
                    <Link to="/registro" className="text-black font-medium hover:underline">
                      Regístrate
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLogin;
