import React from "react";
import Landing from "./components/pages/landing";
import Login from "./components/pages/login";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardAdminSede from "./components/pages/dashboardAdminSede";

function App() {
  return (
    <>
      <Router>
        {/* <Navbar /> Navbar fijo en todas las páginas */}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardAdminSede/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
