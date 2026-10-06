import { Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";

const CartComponent = ({
  cartItems = [],
  increaseQuantity,
  decreaseQuantity,
}) => {
  const navigate = useNavigate();

  // =========================================
  // NO ITEMS
  // =========================================

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 lg:py-10 xl:px-12">

        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">

          {/* SIDEBAR */}
          <Sidebar activeItem="My Cart" />

          {/* EMPTY CART */}
          <div className="min-w-0 flex-1">

            <h1 className="text-2xl font-semibold text-[#4b6800] sm:text-3xl">
              Shopping Cart
            </h1>

            <div className="mt-6 flex min-h-[250px] items-center justify-center rounded-lg border border-gray-300 px-4 sm:mt-8 sm:min-h-[300px]">
              <p className="text-center text-lg text-gray-500 sm:text-xl">
                No item added to the cart
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => navigate("/")}
                className="
                  w-full
                  rounded-lg
                  bg-[#4b6800]
                  px-6
                  py-3
                  font-semibold
                  text-white
                  hover:bg-[#3d5500]
                  sm:w-auto
                  sm:px-10
                  sm:py-4
                "
              >
                Continue Shopping
              </button>
            </div>

          </div>
        </div>
      </main>
    );
  }

  // =========================================
  // CALCULATE SUBTOTAL
  // =========================================

  const itemSubtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const serviceFee = 200;

  const subtotal = itemSubtotal + serviceFee;

  // =========================================
  // CART
  // =========================================

  return (
    <main className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:px-10 lg:py-10 xl:px-12">

      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">

        {/* ========================================= */}
        {/* REUSABLE SIDEBAR */}
        {/* ========================================= */}

        <Sidebar activeItem="My Cart" />

        {/* ========================================= */}
        {/* RIGHT SIDE CONTENT */}
        {/* ========================================= */}

        <div className="min-w-0 flex-1">

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-10">

            {/* ========================================= */}
            {/* LEFT - CART ITEMS */}
            {/* ========================================= */}

            <div className="min-w-0">

              <h1 className="mb-5 text-2xl font-semibold text-[#4b6800] sm:mb-6 sm:text-3xl">
                Shopping Cart
              </h1>

              {/* CART ITEMS */}

              <div className="overflow-hidden rounded-xl border border-gray-300">

                {cartItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`
                      flex
                      flex-col
                      gap-4
                      p-4
                      sm:flex-row
                      sm:items-center
                      sm:gap-5
                      sm:p-5
                      md:p-6
                      lg:gap-6
                      ${
                        index !== cartItems.length - 1
                          ? "border-b border-gray-300"
                          : ""
                      }
                    `}
                  >

                    {/* ================================= */}
                    {/* PRODUCT IMAGE */}
                    {/* ================================= */}

                    <div
                      className="
                        flex
                        h-[120px]
                        w-[120px]
                        shrink-0
                        items-center
                        justify-center
                        self-center
                        sm:h-[125px]
                        sm:w-[125px]
                        sm:self-auto
                        md:h-[140px]
                        md:w-[140px]
                        lg:h-[150px]
                        lg:w-[150px]
                      "
                    >
                      <img
                        src={item.images?.[0] || item.image}
                        alt={item.name}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    {/* ================================= */}
                    {/* PRODUCT DETAILS */}
                    {/* ================================= */}

                    <div className="flex min-w-0 flex-1 flex-col">

                      <h2 className="text-base font-medium leading-6 text-[#4b6800] sm:text-lg sm:leading-7">
                        {item.name}
                      </h2>

                      {item.description && (
                        <p className="mt-1 line-clamp-3 text-sm leading-5 text-[#4b6800] sm:text-base sm:leading-6">
                          {item.description}
                        </p>
                      )}

                      {/* PRICE */}
                      <p className="mt-2 text-base font-semibold text-[#4b6800] sm:text-lg">
                        ₹ {Number(item.price).toFixed(2)}
                      </p>

                      {/* ================================= */}
                      {/* QUANTITY */}
                      {/* ================================= */}

                      <div
                        className="
                          mt-4
                          flex
                          h-10
                          w-[150px]
                          overflow-hidden
                          rounded-lg
                          sm:mt-5
                          sm:h-11
                          sm:w-[170px]
                          md:h-12
                          md:w-[180px]
                          lg:w-[190px]
                        "
                      >

                        {/* MINUS */}
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="
                            flex
                            w-11
                            items-center
                            justify-center
                            bg-[#4b6800]
                            text-white
                            hover:bg-[#3d5500]
                            sm:w-12
                            md:w-14
                          "
                        >
                          <Minus
                            size={18}
                            className="sm:size-5 md:size-[22px]"
                          />
                        </button>

                        {/* QUANTITY */}
                        <span
                          className="
                            flex
                            flex-1
                            items-center
                            justify-center
                            border-y
                            border-gray-300
                            text-lg
                            text-[#4b6800]
                            sm:text-xl
                          "
                        >
                          {item.quantity}
                        </span>

                        {/* PLUS */}
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="
                            flex
                            w-11
                            items-center
                            justify-center
                            bg-[#4b6800]
                            text-white
                            hover:bg-[#3d5500]
                            sm:w-12
                            md:w-14
                          "
                        >
                          <Plus
                            size={18}
                            className="sm:size-5 md:size-[22px]"
                          />
                        </button>

                      </div>
                    </div>

                    {/* ================================= */}
                    {/* PRICE TOTAL */}
                    {/* ================================= */}

                    <div
                      className="
                        flex
                        shrink-0
                        items-center
                        text-lg
                        font-medium
                        text-[#4b6800]
                        sm:self-start
                        md:text-xl
                        lg:self-center
                      "
                    >
                      ₹ {(item.price * item.quantity).toFixed(2)}
                    </div>

                  </div>
                ))}
              </div>

              {/* ========================================= */}
              {/* CONTINUE SHOPPING */}
              {/* ========================================= */}

              <div className="mt-5 flex justify-center sm:justify-end">

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="
                    w-full
                    rounded-lg
                    bg-[#4b6800]
                    px-8
                    py-3
                    font-semibold
                    text-white
                    hover:bg-[#3d5500]
                    sm:w-auto
                    sm:px-10
                    sm:py-4
                  "
                >
                  Continue Shopping
                </button>

              </div>

            </div>

            {/* ========================================= */}
            {/* RIGHT - SUMMARY */}
            {/* ========================================= */}

            <div className="w-full">

              <h2 className="mb-5 text-2xl font-semibold text-[#4b6800] sm:mb-6 sm:text-3xl">
                Summary
              </h2>

              <div className="rounded-xl border border-gray-300 p-4 shadow-sm sm:p-5 md:p-6">

                {/* ITEM SUBTOTAL */}

                <div className="flex items-center justify-between gap-4 text-base sm:text-lg">

                  <span className="text-[#4b6800]">
                    Item Subtotal
                  </span>

                  <span className="shrink-0 font-semibold text-[#4b6800]">
                    ₹ {itemSubtotal.toFixed(2)}
                  </span>

                </div>

                {/* SERVICE FEE */}

                <div className="mt-5 flex items-center justify-between gap-4 text-base sm:mt-7 sm:text-lg">

                  <span className="text-[#4b6800]">
                    Service Fee
                  </span>

                  <span className="shrink-0 font-semibold text-[#4b6800]">
                    ₹ {serviceFee.toFixed(2)}
                  </span>

                </div>

                {/* TOTAL */}

                <div className="mt-5 flex items-center justify-between gap-4 border-t border-gray-200 pt-5 text-base sm:mt-7 sm:pt-6 sm:text-lg">

                  <span className="text-[#4b6800]">
                    Subtotal
                  </span>

                  <span className="shrink-0 font-semibold text-[#4b6800]">
                    ₹ {subtotal.toFixed(2)}
                  </span>

                </div>

                {/* ================================= */}
                {/* CHECKOUT */}
                {/* ================================= */}

                <button
                  type="button"
                  onClick={() => navigate("/checkout")}
                  className="
                    mt-6
                    w-full
                    rounded-lg
                    bg-[#4b6800]
                    py-3
                    font-semibold
                    text-white
                    hover:bg-[#3d5500]
                    sm:mt-8
                    sm:py-4
                  "
                >
                  Go to Check Out
                </button>

                {/* ================================= */}
                {/* TERMS */}
                {/* ================================= */}

                <p className="mt-4 text-xs leading-5 text-gray-700 sm:mt-5 sm:text-sm">
                  By placing your order, you agree to be bound by the Noon Herb{" "}
                  <span className="text-[#4b6800] underline">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-[#4b6800] underline">
                    Privacy Policy
                  </span>
                  .
                </p>

                {/* ================================= */}
                {/* PROMO */}
                {/* ================================= */}

                <h3 className="mt-7 text-xl font-medium text-[#4b6800] sm:mt-8 sm:text-2xl">
                  Add Promo or Gift Card
                </h3>

                <label className="mt-5 block text-base text-[#4b6800] sm:mt-6 sm:text-lg">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your Email Address"
                  className="
                    mt-3
                    w-full
                    rounded-lg
                    border
                    border-gray-200
                    px-4
                    py-3
                    text-sm
                    outline-none
                    shadow-sm
                    focus:border-[#4b6800]
                    sm:px-5
                    sm:py-4
                    sm:text-base
                  "
                />

                <button
                  type="button"
                  className="
                    mt-4
                    w-full
                    rounded-lg
                    bg-[#4b6800]
                    py-3
                    font-semibold
                    text-white
                    hover:bg-[#3d5500]
                    sm:mt-5
                    sm:py-4
                  "
                >
                  Redeem
                </button>

                <p className="mt-4 text-xs text-[#4b6800] sm:mt-5 sm:text-sm">
                  Terms & Conditions apply
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default CartComponent;