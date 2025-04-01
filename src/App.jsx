import React from "react";
import Landing from "./components/pages/landing";
import Login from "./components/pages/login";
import MyRegister from "./components/pages/register";
import MyNavbar from "./components/layout/navbar";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import DashboardAdminSede from "./components/pages/dashboardAdminSede";
import DashboardAdmin from "./components/pages/dashboardAdmin"

// Create a wrapper component for the Navbar
const NavbarWrapper = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/login', '/register']; // Add any paths where navbar should be hidden
  
  return !hideNavbarPaths.includes(location.pathname) ? <MyNavbar /> : null;
};

function App() {
  return (
    <Router>
      <NavbarWrapper />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<MyRegister />} />
        <Route path="/dashboard" element={<DashboardAdminSede/>} />
        <Route path="/admin" element={<DashboardAdmin/>} />
      </Routes>
    </Router>
  );
}

export default App;
