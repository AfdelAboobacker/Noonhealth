import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OrderComponent from "../components/OrderComponent";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = localStorage.getItem("orders");

      if (savedOrders) {
        try {
          const parsedOrders = JSON.parse(savedOrders);

          if (Array.isArray(parsedOrders)) {
            setOrders(parsedOrders);
          } else {
            setOrders([]);
          }
        } catch (error) {
          console.error("Failed to load orders:", error);
          setOrders([]);
        }
      } else {
        setOrders([]);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* ========================================= */}
      {/* NAVBAR BACKGROUND */}
      {/* ========================================= */}

      <div
        className="
          absolute
          left-0
          top-0
          z-0
          h-[75px]
          w-full
          bg-cover
          bg-center
          bg-no-repeat
          lg:h-[90px]
        "
        style={{
          backgroundImage: "url('/images/navbg/navbg.png')",
        }}
      />

      {/* ========================================= */}
      {/* NAVBAR */}
      {/* ========================================= */}

      <Navbar />

      {/* ========================================= */}
      {/* ORDERS */}
      {/* ========================================= */}

      <main className="pt-[105px] sm:pt-[110px] lg:pt-[130px]">
        <OrderComponent orders={orders} />
      </main>

      {/* ========================================= */}
      {/* FOOTER */}
      {/* ========================================= */}

      <Footer />
    </div>
  );
};

export default Order;