import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Checkout = ({ cartItems = [], clearCart }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    paymentMethod: "Cash on Delivery",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (
      !formData.name.trim() ||
      !formData.address.trim() ||
      !formData.phone.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const itemSubtotal = cartItems.reduce(
      (total, item) => total + Number(item.price) * item.quantity,
      0
    );

    const serviceFee = 200;
    const total = itemSubtotal + serviceFee;

    // Save complete product information
    const products = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      image: item.images?.[0] || item.image || "",
      description: item.description || "",
      price: Number(item.price),
      quantity: item.quantity,
      itemTotal: Number(item.price) * item.quantity,
    }));

    const newOrder = {
      id: Date.now(),

      customer: {
        name: formData.name.trim(),
        address: formData.address.trim(),
        phone: formData.phone.trim(),
      },

      products,

      itemSubtotal,
      serviceFee,
      total,

      paymentMethod: formData.paymentMethod,

      orderDate: new Date().toISOString(),

      status: "Placed",
    };

    // Get existing orders
    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    // Add new order
    const updatedOrders = [newOrder, ...existingOrders];

    // Save orders
    localStorage.setItem("orders", JSON.stringify(updatedOrders));

    // Save latest order separately
    localStorage.setItem("latestOrder", JSON.stringify(newOrder));

    // Clear ONLY the cart
    clearCart();

    alert("Order placed successfully!");

    // Go to home after successful order
    navigate("/");
  };

  return (
    <main className="mx-auto w-full max-w-[1000px] px-4 py-8 sm:px-6 md:px-8">
      <h1 className="mb-8 text-3xl font-semibold text-[#4b6800]">
        Checkout
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Customer Details */}
        <div className="rounded-xl border border-gray-300 p-5 sm:p-6">
          <h2 className="mb-6 text-2xl font-semibold text-[#4b6800]">
            Delivery Details
          </h2>

          <div className="space-y-5">
            <div>
              <label className="mb-2 block font-medium text-[#4b6800]">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#4b6800]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-[#4b6800]">
                Delivery Address
              </label>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your delivery address"
                rows="4"
                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#4b6800]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-[#4b6800]">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter 10-digit phone number"
                maxLength="10"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#4b6800]"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-[#4b6800]">
                Payment Method
              </label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#4b6800]"
              >
                <option>Cash on Delivery</option>
                <option>Online Payment</option>
              </select>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-xl border border-gray-300 p-5 sm:p-6">
          <h2 className="mb-6 text-2xl font-semibold text-[#4b6800]">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <img
                    src={item.images?.[0] || item.image}
                    alt={item.name}
                    className="h-16 w-16 shrink-0 object-contain"
                  />

                  <div className="min-w-0">
                    <p className="truncate font-medium text-[#4b6800]">
                      {item.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>

                <p className="shrink-0 font-semibold text-[#4b6800]">
                  ₹ {(Number(item.price) * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-4 text-[#4b6800]">
            <div className="flex justify-between">
              <span>Item Subtotal</span>

              <span className="font-semibold">
                ₹{" "}
                {cartItems
                  .reduce(
                    (total, item) =>
                      total + Number(item.price) * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Service Fee</span>

              <span className="font-semibold">₹ 200.00</span>
            </div>

            <div className="flex justify-between border-t border-gray-200 pt-4 text-lg">
              <span className="font-semibold">Total</span>

              <span className="font-bold">
                ₹{" "}
                {(
                  cartItems.reduce(
                    (total, item) =>
                      total + Number(item.price) * item.quantity,
                    0
                  ) + 200
                ).toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePlaceOrder}
            className="mt-8 w-full rounded-lg bg-[#4b6800] py-4 font-semibold text-white transition hover:bg-[#3d5500]"
          >
            Place Order
          </button>
        </div>
      </div>
    </main>
  );
};