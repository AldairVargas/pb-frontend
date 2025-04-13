import React, { useState, useEffect } from "react";
import {
  Home,
  Warehouse,
  LogOut,
  Menu,
  X,
  User,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const SidebarCliente = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        !e.target.closest("#mobile-drawer") &&
        !e.target.closest("#menu-button")
      ) {
        setIsOpen(false);
      }
    };

    const timeout = setTimeout(() => {
      document.addEventListener("click", handleOutsideClick);
    }, 0);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <>
      {/* NAVBAR móvil */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow fixed top-0 left-0 right-0 z-50 h-16">
        <div className="flex items-center space-x-2">
          <Warehouse className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-bold text-blue-600">Bodega Segura</h2>
        </div>
        <button id="menu-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X className="w-6 h-6 text-blue-600" />
          ) : (
            <Menu className="w-6 h-6 text-blue-600" />
          )}
        </button>
      </div>

      {/* SIDEBAR escritorio */}
      <div className="hidden md:flex flex-col min-h-screen w-64 bg-white shadow-md px-4 py-6 border-r border-gray-200">
        <div className="flex items-center justify-center mb-8 space-x-2">
          <div className="bg-blue-100 p-2 rounded-full shadow-sm">
            <Warehouse className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-blue-600">Bodega Segura</h2>
        </div>
        <NavLinks onClick={null} handleLogout={handleLogout} />
      </div>

      {/* SIDEBAR móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            className="fixed top-0 left-0 bottom-0 w-64 bg-white z-50 shadow-md md:hidden p-4 overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-6 space-x-2">
              <Warehouse className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-bold text-blue-600">Bodega Segura</h2>
            </div>
            <NavLinks onClick={() => setIsOpen(false)} handleLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="md:hidden h-16" />
    </>
  );
};

const NavLinks = ({ onClick, handleLogout }) => (
  <nav className="flex flex-col md:space-y-4 space-y-2">
    <a
      href="#inicio"
      onClick={onClick}
      className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-50 transition"
    >
      <Home className="w-5 h-5 mr-2 text-blue-600" />
      <span className="text-sm font-medium text-gray-700">Inicio</span>
    </a>
    <a
      href="#reservas"
      onClick={onClick}
      className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-50 transition"
    >
      <User className="w-5 h-5 mr-2 text-blue-600" />
      <span className="text-sm font-medium text-gray-700">Mis Reservas</span>
    </a>
    <button
      onClick={() => {
        if (onClick) onClick();
        handleLogout();
      }}
      className="flex items-center mt-6 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-700 transition"
    >
      <LogOut className="w-5 h-5 mr-2" />
      Cerrar sesión
    </button>
  </nav>
);

export default SidebarCliente;
