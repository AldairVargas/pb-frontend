import { useAuth } from "../../context/AuthContext";

const PrivateRoute = ({ element, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Cargando...</div>; // por si está en proceso

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};
export default PrivateRoute;