import React from "react";

import Navbar from "../../components/layout/navbar.jsx";
import Hero from "../../components/sections/hero.jsx";
import Services from "../../components/sections/services.jsx";
import Catalog from "../../components/sections/catalog.jsx";
import Contact from "../../components/sections/contact.jsx";
import MyOffert from "../../components/sections/offert.jsx"; 
import Footer from "../layout/footer.jsx";

export default function Landing() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Catalog />
      <Contact />
      <MyOffert />
      <Footer />
    </div>
  );
}
