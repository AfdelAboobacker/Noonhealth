import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { Home } from "./page/Home";
import Cart from "./page/Cart";
import ScrollToTop from "./components/ScrollToTop";
import { Productview } from "./page/ProductView";

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  // ADD TO CART
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

  // INCREASE QUANTITY
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
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  return (
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home onAddToCart={handleAddToCart} />} />

        <Route
          path="/product/:id"
          element={<Productview onAddToCart={handleAddToCart} />}
        />

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
