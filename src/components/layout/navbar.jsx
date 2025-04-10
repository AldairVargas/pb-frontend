import { useState, useEffect } from "react";
import { Warehouse, Menu, X, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const MyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const location = useLocation();
  const isHome = location.pathname === "/";
  const isGallery = location.pathname === "/gallery";
  const isDetails = location.pathname.startsWith("/warehouse/");

  useEffect(() => {
    if (isHome) {
      const handleScroll = () => setIsScrolled(window.scrollY > 50);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isHome]);

  const baseColor =
    isHome && isScrolled
      ? "bg-white/70 shadow-md backdrop-blur-lg"
      : isGallery || isDetails
      ? "bg-white shadow-md text-gray-900"
      : "bg-transparent text-white";

  const textColor =
    isGallery || isDetails || isScrolled ? "text-gray-900" : "text-white";

  // 💡 Solo aplicar position: fixed si estamos en la landing
  const positionStyle = isHome ? "fixed" : "relative";

  return (
    <div className="flex flex-col">
      <header
        className={`${positionStyle} top-0 left-0 w-full z-50 transition-all duration-300 ${baseColor}`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link to="/">
            <div className={`flex gap-2 items-center text-2xl ${textColor}`}>
              <Warehouse />
              <span>BodegaSegura</span>
            </div>
          </Link>

          {/* Botón Menú Hamburguesa */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden transition-colors duration-300 focus:outline-none ${
              textColor
            }`}
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>

          {/* Menú Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/gallery"
              className={`text-sm transition-colors hover:text-blue-600 ${textColor}`}
            >
              Galería
            </Link>

            {isAuthenticated() && user ? (
              <Link
                to="/profile"
                className={`flex items-center gap-2 text-sm transition-colors hover:text-blue-600 ${textColor}`}
              >
                <User className="w-4 h-4" />
                Mi Perfil
              </Link>
            ) : (
              <Link
                to="/auth"
                className={`text-sm transition-colors hover:text-blue-600 ${textColor}`}
              >
                Iniciar sesión
              </Link>
            )}

            <Link to="/auth">
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                Reservar Ahora
              </button>
            </Link>
          </nav>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/90 backdrop-blur-lg shadow-md p-4"
          >
            <nav className="flex flex-col space-y-4 text-center">
              <Link
                to="/gallery"
                className="text-sm text-gray-700 transition-colors hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                Galería
              </Link>
              {isAuthenticated() && user ? (
                <Link
                  to="/profile"
                  className="flex items-center justify-center gap-2 text-sm text-gray-700 transition-colors hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Mi Perfil
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className="text-sm text-gray-700 transition-colors hover:text-blue-600"
                  onClick={() => setIsOpen(false)}
                >
                  Iniciar sesión
                </Link>
              )}
              <Link to="/auth" onClick={() => setIsOpen(false)}>
                <button className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-md transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
                  Reservar Ahora
                </button>
              </Link>
            </nav>
          </motion.div>
        )}
      </header>
    </div>
  );
};

export default MyNavbar;
