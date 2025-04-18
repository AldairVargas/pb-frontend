import React from "react";
import Landing from "./components/pages/landing";
import MyNavbar from "./components/layout/navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import DashboardAdminSede from "./components/pages/dashboardAdminSede";
import DashboardAdmin from "./components/pages/dashboardAdmin"
import AuthPage from "./components/pages/Auth";
import WarehouseGallery from "./components/pages/warehouseGallery";
import WarehouseDetail from "./components/pages/warehouseDetail";
import UserProfile from "./components/pages/UserProfile";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/layout/PrivateRoute";

// Create a wrapper component for the Navbar
const NavbarWrapper = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register', '/dashboard', '/auth', '/admin'];
  
  return !hideNavbarPaths.includes(location.pathname) ? <MyNavbar /> : null;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavbarWrapper />
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/gallery" element={<WarehouseGallery />} />
          <Route path="/warehouse/:id" element={<WarehouseDetail />} />

          {/* Rutas protegidas */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                element={<DashboardAdminSede />}
                allowedRoles={["Admin"]}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute
                element={<DashboardAdmin />}
                allowedRoles={["SuperAdmin"]}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute
                element={<UserProfile />}
                allowedRoles={["User", "Admin", "SuperAdmin"]}
              />
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
