import React from "react";
import GalleryMasonry from "../ui/galleryMasonry";
import { motion } from "framer-motion";

export default function WarehouseGallery() {
  const animatedText = "Soluciones de almacenamiento para todos";

  return (
    <div className="pt-20 px-4 md:px-12  min-h-screen ">
      <section className="flex flex-col items-center">
        <div className="flex max-w-xl flex-col items-center pb-16 pt-8 text-center lg:pb-24 lg:pt-20">
          <h1 className="mb-8 text-4xl font-bold text-black sm:text-5xl md:mb-12 md:text-6xl">
            Descubre tu próxima bodega
          </h1>

          {/* Animación tipo escritura */}
          <motion.p
            className="mb-4 font-semibold text-indigo-500 md:mb-6 md:text-lg xl:text-xl flex flex-wrap justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.04,
                },
              },
            }}
          >
            {animatedText.split("").map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 5 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.2 }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.p>
        </div>
      </section>

      <GalleryMasonry />
    </div>
  );
}
