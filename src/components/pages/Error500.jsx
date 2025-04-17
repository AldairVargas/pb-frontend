import React from "react";
import { motion } from "framer-motion";

const Error500 = () => {
  return (
    <motion.div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #ffe6e6, #ffffff)",
        padding: "20px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="text-center bg-white shadow-lg p-5 rounded"
        style={{ maxWidth: "520px" }}
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="mb-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ fontSize: "60px", color: "#FF6B6B" }}
          >
            ⚠️
          </motion.div>
        </div>

        <div className="badge bg-danger text-white mb-3 fs-6">500</div>

        <h1 className="mb-3 fw-bold fs-3">Error interno del servidor</h1>
        <p className="text-muted mb-4">
          Algo salió mal en nuestro sistema. Intenta recargar la página o vuelve más tarde.
        </p>

        <motion.a
          href="/"
          className="btn btn-danger px-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Volver al inicio
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default Error500;
