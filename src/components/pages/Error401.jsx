import React from "react";
import { motion } from "framer-motion";

const Error401 = () => {
  return (
    <motion.div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #fff3e0, #ffe0b2)",
        padding: "20px",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="text-center bg-white shadow-lg p-5 rounded"
        style={{ maxWidth: "520px" }}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="mb-4">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            style={{ fontSize: "60px", color: "#ffa726" }}
          >
            🔒
          </motion.div>
        </div>

        <div className="badge bg-warning text-dark mb-3 fs-6">401</div>

        <h1 className="mb-3 fw-bold fs-3">No autorizado</h1>
        <p className="text-muted mb-4">
          Necesitas iniciar sesión para acceder a esta página o tu sesión ha expirado.
        </p>

        <motion.a
          href="/login"
          className="btn btn-warning text-white px-4"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Ir a iniciar sesión
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default Error401;
