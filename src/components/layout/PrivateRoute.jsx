import { useAuth } from "../../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ element, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Cargando...</div>;

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};
export default PrivateRoute;