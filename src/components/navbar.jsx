import { useState, useEffect } from "react";
import { Warehouse, Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const MyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Detecta si el usuario ha bajado más de 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/70 shadow-md backdrop-blur-lg" // Navbar con scroll
            : "bg-transparent backdrop-blur-lg" // Navbar inicial
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex gap-2 items-center text-2xl text-gray-900">
            <Warehouse />
            <span>BodegaSegura</span>
          </div>

          {/* Botón Menú Hamburguesa (Móvil) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="#servicios"
              className="text-sm text-gray-700 transition-colors hover:text-blue-600"
            >
              Servicios
            </a>
            <a
              href="#catalogo"
              className="text-sm text-gray-700 transition-colors hover:text-blue-600"
            >
              Catálogo
            </a>
            <a
              href="#opiniones"
              className="text-sm text-gray-700 transition-colors hover:text-blue-600"
            >
              Opiniones
            </a>
            <a
              href="#contacto"
              className="text-sm text-gray-700 transition-colors hover:text-blue-600"
            >
              Contacto
            </a>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
              Reservar Ahora
            </button>
          </nav>
        </div>

        {/* Menú Móvil (Animación con Framer Motion) */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/90 backdrop-blur-lg shadow-md p-4"
          >
            <nav className="flex flex-col space-y-4 text-center">
              <a
                href="#servicios"
                className="text-sm text-gray-700 transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Servicios
              </a>
              <a
                href="#catalogo"
                className="text-sm text-gray-700 transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Catálogo
              </a>
              <a
                href="#opiniones"
                className="text-sm text-gray-700 transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Opiniones
              </a>
              <a
                href="#contacto"
                className="text-sm text-gray-700 transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Contacto
              </a>
              <button
                className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                onClick={() => setIsOpen(false)}
              >
                Reservar Ahora
              </button>
            </nav>
          </motion.div>
        )}
      </header>
    </div>
  );
};

export default MyNavbar;
