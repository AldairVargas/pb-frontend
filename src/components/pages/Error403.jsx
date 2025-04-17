import React from "react";
import { motion } from "framer-motion";

const Error403 = () => {
  return (
    <motion.div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f3f4f6, #e0e7ff)",
        padding: "20px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="text-center bg-white shadow-lg p-5 rounded"
        style={{ maxWidth: "520px" }}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="mb-4">
          <motion.div
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            style={{ fontSize: "60px", color: "#6c5ce7" }}
          >
            🚫
          </motion.div>
        </div>

        <div className="badge bg-primary text-white mb-3 fs-6">403</div>

        <h1 className="mb-3 fw-bold fs-3">Acceso denegado</h1>
        <p className="text-muted mb-4">
          No tienes permiso para acceder a esta página o recurso.
        </p>

        <motion.a
          href="/"
          className="btn btn-primary px-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Volver al inicio
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default Error403;
