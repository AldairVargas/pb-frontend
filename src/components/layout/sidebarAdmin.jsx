import React, { useState, useEffect } from "react";
import {
  Home,
  Users,
  Building,
  Boxes,
  Settings,
  List,
  LogOut,
  Menu,
  Warehouse
} from "lucide-react";

const sidebarAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Cierra el menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#mobile-menu") && !e.target.closest("#menu-button")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Controla el scroll del fondo
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isOpen);
  }, [isOpen]);

  return (
    <>
      {/* Navbar para móviles */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white shadow fixed top-0 left-0 right-0 z-50 h-16">
        <div className="flex items-center space-x-2">
          <Boxes className="w-6 h-6 text-blue-600" />
          <h2 className="text-lg font-bold text-blue-600">Bodega segura</h2>
        </div>
        <button id="menu-button" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6 text-blue-600" />
        </button>
      </div>

      {/* Sidebar en escritorio */}
      <aside className="hidden md:flex flex-col min-h-screen w-64 bg-white shadow-md px-4 py-6 border-r border-gray-200">
        <div className="flex items-center justify-center mb-8 space-x-2">
          <div className="bg-blue-100 p-2 rounded-full shadow-sm">
            <Warehouse className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-blue-600">Bodega segura</h2>
        </div>
        <NavLinks />
      </aside>

      {/* Menú desplegable móvil */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="fixed top-16 left-0 right-0 bottom-0 bg-white border-t shadow z-40 overflow-y-auto md:hidden"
        >
          <NavLinks onClick={() => setIsOpen(false)} />
        </div>
      )}

      {/* Espaciado para evitar que el contenido quede detrás de la navbar */}
      <div className="md:hidden h-16" />
    </>
  );
};

const NavLinks = ({ onClick }) => (
  <nav className="flex flex-col md:space-y-4 p-4 space-y-2">
    <a href="#dashboard" onClick={onClick} className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-50 transition">
      <Home className="w-5 h-5 mr-2 text-blue-600" />
      <span className="text-sm font-medium text-gray-700">Dashboard</span>
    </a>
    <a href="#usuarios" onClick={onClick} className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-50 transition">
      <Users className="w-5 h-5 mr-2 text-blue-600" />
      <span className="text-sm font-medium text-gray-700">Usuarios</span>
    </a>
    <a href="#sedes" onClick={onClick} className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-50 transition">
      <Building className="w-5 h-5 mr-2 text-blue-600" />
      <span className="text-sm font-medium text-gray-700">Sedes</span>
    </a>
    <a href="#almacenes" onClick={onClick} className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-50 transition">
      <Boxes className="w-5 h-5 mr-2 text-blue-600" />
      <span className="text-sm font-medium text-gray-700">Almacenes</span>
    </a>
    <a href="#reportes" onClick={onClick} className="flex items-center px-4 py-2 rounded-lg hover:bg-blue-50 transition">
      <List className="w-5 h-5 mr-2 text-blue-600" />
      <span className="text-sm font-medium text-gray-700">Reportes</span>
    </a>
    <button onClick={onClick} className="flex items-center mt-6 px-4 py-2 text-sm font-medium text-red-500 hover:text-red-700 transition">
      <LogOut className="w-5 h-5 mr-2" />
      Cerrar sesión
    </button>
  </nav>
);

export default sidebarAdmin;
