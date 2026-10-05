import React from "react";
import Navbar from "../components/Navbar";
import SeaallComponet from "../components/SeaallComponet";
import Footer from "../components/Footer";

export const Seeall = ({ onAddToCart }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Product page navbar background */}
      <div
        className="absolute left-0 top-0 z-0 h-[75px] w-full bg-cover bg-center bg-no-repeat lg:h-[90px]"
        style={{
          backgroundImage: "url('/images/navbg/navbg.png')",
        }}
      />
      <Navbar />

      <div className="pt-[100px] lg:pt-[150px]">
        <SeaallComponet onAddToCart={onAddToCart} />
      </div>

      <Footer />
    </div>
  );
};
