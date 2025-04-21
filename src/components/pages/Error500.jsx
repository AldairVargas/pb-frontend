import React, { useState } from "react";
import { motion } from "framer-motion";

const Error500 = () => {
  const [isHovered, setIsHovered] = useState(false);

  const iconVariants = {
    hover: { rotate: 10, scale: 1.1 },
    tap: { rotate: -10, scale: 0.95 },
  };

  return (
    <motion.div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #ffe6e6 0%, #ffffff 100%)",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: "2px",
            height: "2px",
            backgroundColor: "#ff6b6b",
            borderRadius: "50%",
            opacity: 0.4,
          }}
          animate={{ y: ["0%", "20%", "0%"] }}
          transition={{
            repeat: Infinity,
            duration: 4 + Math.random() * 4,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <motion.div
        style={{
          textAlign: "center",
          maxWidth: "520px",
          padding: "50px",
          background: "white",
          borderRadius: "20px",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.1)",
        }}
        initial={{ y: -30 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <motion.div
          style={{
            width: "140px",
            height: "140px",
            margin: "0 auto 30px",
          }}
          whileHover="hover"
          whileTap="tap"
          variants={iconVariants}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#FF6B6B" strokeWidth="2" />
            <path
              d="M12 8v4"
              stroke="#FF6B6B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="1" fill="#FF6B6B" />
          </svg>
        </motion.div>

        <div
          style={{
            display: "inline-block",
            background: "#FF6B6B",
            color: "white",
            padding: "6px 18px",
            borderRadius: "999px",
            fontSize: "0.95rem",
            fontWeight: "700",
            letterSpacing: "0.5px",
            marginBottom: "18px",
          }}
        >
          ERROR 500
        </div>

        <h1 style={{ fontSize: "2.2rem", color: "#2d3436", fontWeight: "800" }}>
          Error del servidor
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#636e72",
            marginBottom: "30px",
            lineHeight: "1.8",
          }}
        >
          Algo salió mal en nuestro sistema. Intenta recargar la página o vuelve más tarde.
        </p>

        <motion.button
          style={{
            background: "#FF6B6B",
            color: "white",
            border: "none",
            padding: "14px 36px",
            borderRadius: "10px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            margin: "0 auto",
          }}
          whileHover={{ scale: 1.06, backgroundColor: "#ff4d4d" }}
          whileTap={{ scale: 0.95 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={() => (window.location.href = "/")}
        >
          <motion.span
            animate={{
              x: isHovered ? [0, 6, -6, 0] : 0,
            }}
            transition={{ duration: 0.6 }}
          >
            ←
          </motion.span>
          Volver al inicio
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Error500;
