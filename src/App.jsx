import React from "react";

import "./App.css";
import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Services from "./components/services";
import Catalog from "./components/catalog";
import Contact from "./components/contact";
import MyOffert from "./components/offert";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Catalog />
      <Contact />
      <MyOffert />
    </>
  );
}

export default App;