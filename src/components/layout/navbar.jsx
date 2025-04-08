import { useState, useEffect } from "react";
import { Warehouse, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const MyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const location = useLocation();
  const isGallery = location.pathname === "/gallery";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseColor = isGallery
    ? "bg-white shadow-md text-gray-900"
    : isScrolled
    ? "bg-white/70 shadow-md backdrop-blur-lg"
    : "bg-transparent text-white";

  const textColor = isGallery || isScrolled ? "text-gray-900" : "text-white";

  return (
    <div className="flex flex-col">
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${baseColor}`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to={'/'}>
            <div className={`flex gap-2 items-center text-2xl ${textColor}`}>
              <Warehouse />
              <span>BodegaSegura</span>
            </div>
          </Link>

          {/* Botón Menú Hamburguesa (Móvil) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden transition-colors duration-300 focus:outline-none ${
              isGallery || isScrolled ? "text-gray-800" : "text-white"
            }`}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            {["servicios", "catalog", "contacto"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={`text-sm transition-colors hover:text-blue-600 ${
                  isGallery || isScrolled ? "text-gray-700" : "text-white"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
            <Link
              to={"/auth"}
              className={`text-sm transition-colors hover:text-blue-600 ${
                isGallery || isScrolled ? "text-gray-700" : "text-white"
              }`}
            >
              Iniciar sesión
            </Link>
            <Link to={"/auth"}>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                Reservar Ahora
              </button>
            </Link>
          </nav>
        </div>

        {/* Menú Móvil */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/90 backdrop-blur-lg shadow-md p-4"
          >
            <nav className="flex flex-col space-y-4 text-center">
              {["servicios", "catalog", "contacto"].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className="text-sm text-gray-700 transition-colors hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
              <Link
                to="/auth"
                className="text-sm text-gray-700 transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Iniciar sesión
              </Link>
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
