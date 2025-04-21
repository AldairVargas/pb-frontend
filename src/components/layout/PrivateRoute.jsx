import { useAuth } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Cargando...</div>;

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // ✅ Solo si user.role es una cadena (ej. "Admin", "User", "SuperAdmin")
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />;
  }

  return element;
};

export default PrivateRoute;
