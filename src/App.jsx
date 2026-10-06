import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Home } from "./page/Home";
import Cart from "./page/Cart";
import ScrollToTop from "./components/ScrollToTop";
import { Productview } from "./page/Productview";
import { Seeall } from "./page/Seeall";
import SignIn from "./page/SignIn";
import { Register } from "./page/Register";
import { Checkout } from "./page/Checkout";
import Order from "./page/Order";

const App = () => {
  // ==========================================
  // LOGIN STATE
  // ==========================================

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const localUser = localStorage.getItem("noonHerbUser");
    const sessionUser = sessionStorage.getItem("noonHerbUser");

    return !!(localUser || sessionUser);
  });

  // ==========================================
  // CART
  // ==========================================

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("noonHerbCart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ==========================================
  // SAVE CART TO LOCAL STORAGE
  // ==========================================

  useEffect(() => {
    localStorage.setItem("noonHerbCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingProduct = prev.find((item) => item.id === product.id);

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        );
      }

      return [
        ...prev,
        {
          ...product,
          quantity,
        },
      ];
    });
  };

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  // ==========================================
  // CLEAR CART
  // ==========================================

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("noonHerbCart");
  };

  // ==========================================
  // HOME
  // ==========================================

  const homePage = isLoggedIn ? (
    <Home onAddToCart={handleAddToCart} />
  ) : (
    <Navigate to="/signin" replace />
  );

  // ==========================================
  // APP
  // ==========================================

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>
        {/* ====================================== */}
        {/* HOME */}
        {/* ====================================== */}

        <Route path="/" element={homePage} />

        {/* ====================================== */}
        {/* PRODUCT VIEW */}
        {/* ====================================== */}

        <Route
          path="/product/:id"
          element={
            isLoggedIn ? (
              <Productview onAddToCart={handleAddToCart} />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* ====================================== */}
        {/* CART */}
        {/* ====================================== */}

        <Route
          path="/cart"
          element={
            isLoggedIn ? (
              <Cart
                cartItems={cartItems}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />

        {/* ====================================== */}
        {/* SEE ALL */}
        {/* ====================================== */}

        <Route
          path="/seeall"
          element={isLoggedIn ? <Seeall /> : <Navigate to="/signin" replace />}
        />

        {/* ====================================== */}
        {/* CHECKOUT */}
        {/* ====================================== */}

        <Route
          path="/checkout"
          element={
            isLoggedIn ? (
              <Checkout cartItems={cartItems} clearCart={clearCart} />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
       {/* ====================================== */}
        {/* ORDER */}
        {/* ====================================== */}
        <Route
          path="/orders"
          element={isLoggedIn ? <Order /> : <Navigate to="/signin" replace />}
        />

        {/* ====================================== */}
        {/* SIGN IN */}
        {/* ====================================== */}

        <Route
          path="/signin"
          element={<SignIn onLogin={() => setIsLoggedIn(true)} />}
        />

        {/* ====================================== */}
        {/* REGISTER */}
        {/* ====================================== */}

        <Route path="/register" element={<Register />} />

        {/* ====================================== */}
        {/* UNKNOWN URL */}
        {/* ====================================== */}

        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
