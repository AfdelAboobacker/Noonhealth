import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./page/Home";
import Cart from "./page/Cart";
import ScrollToTop from "./components/ScrollToTop";
import { Productview } from "./page/Productview";

const App = () => {
  // LOAD CART FROM LOCAL STORAGE
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("noonHerbCart");

    return savedCart ? JSON.parse(savedCart) : [];
  });

  // SAVE CART TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("noonHerbCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingProduct = prev.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
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

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <Home onAddToCart={handleAddToCart} />
          }
        />

        {/* PRODUCT VIEW */}
        <Route
          path="/product/:id"
          element={
            <Productview
              onAddToCart={handleAddToCart}
            />
          }
        />

        {/* CART */}
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;