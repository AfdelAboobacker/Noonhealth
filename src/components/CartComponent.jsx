import { Minus, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartComponent = ({
  cartItems = [],
  increaseQuantity,
  decreaseQuantity,
}) => {
  const navigate = useNavigate();

  // No items
  if (cartItems.length === 0) {
    return (
      <main className="mx-auto max-w-[1200px] px-5 py-10 md:px-8">

        <h1 className="text-3xl font-semibold text-[#4b6800]">
          Shopping Cart
        </h1>

        <div className="mt-8 flex min-h-[300px] items-center justify-center rounded-lg border border-gray-300">
          <p className="text-xl text-gray-500">
            No item added to the cart
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="rounded-lg bg-[#4b6800] px-10 py-4 font-semibold text-white hover:bg-[#3d5500]"
          >
            Continue Shopping
          </button>
        </div>

      </main>
    );
  }

  // Calculate subtotal
  const itemSubtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const serviceFee = 200;

  const subtotal = itemSubtotal + serviceFee;

  return (
    <main className="mx-auto max-w-[1250px] px-5 py-8 md:px-8">

      {/* PAGE TITLE */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_400px]">

        {/* LEFT */}
        <div>

          <h1 className="mb-6 text-3xl font-semibold text-[#4b6800]">
            Shopping Cart
          </h1>

          <div className="rounded-xl border border-gray-400">

            {cartItems.map((item, index) => (
              <div
                key={item.id}
                className={`
                  flex
                  min-h-[180px]
                  items-center
                  gap-5
                  px-5
                  py-5

                  ${index !== cartItems.length - 1
                    ? "border-b border-gray-400"
                    : ""}
                `}
              >

                {/* IMAGE */}
                <div className="flex h-[140px] w-[140px] shrink-0 items-center justify-center">
                  <img
                    src={
                      item.images?.[0] ||
                      item.image
                    }
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>

                {/* PRODUCT DETAILS */}
                <div className="flex flex-1 flex-col">

                  <h2 className="max-w-[550px] text-lg font-medium leading-7 text-[#4b6800]">
                    {item.name}
                  </h2>

                  <p className="mt-1 max-w-[550px] text-base text-[#4b6800]">
                    {item.description}
                  </p>

                  {/* QUANTITY */}
                  <div className="mt-5 flex h-12 w-[190px] overflow-hidden rounded-lg">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                      className="flex w-14 items-center justify-center bg-[#4b6800] text-white hover:bg-[#3d5500]"
                    >
                      <Minus size={22} />
                    </button>

                    <span className="flex flex-1 items-center justify-center border-y border-gray-300 text-xl text-[#4b6800]">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                      className="flex w-14 items-center justify-center bg-[#4b6800] text-white hover:bg-[#3d5500]"
                    >
                      <Plus size={22} />
                    </button>

                  </div>

                </div>

                {/* PRICE */}
                <div className="shrink-0 text-xl font-medium text-[#4b6800]">
                  ₹ {(item.price * item.quantity).toFixed(2)}
                </div>

              </div>
            ))}

          </div>

          {/* CONTINUE SHOPPING */}
          <div className="mt-5 flex justify-end">

            <button
              onClick={() => navigate("/")}
              className="rounded-lg bg-[#4b6800] px-10 py-4 font-semibold text-white hover:bg-[#3d5500]"
            >
              Continue Shopping
            </button>

          </div>

        </div>

        {/* RIGHT - SUMMARY */}
        <div>

          <h2 className="mb-6 text-3xl font-semibold text-[#4b6800]">
            Summary
          </h2>

          <div className="rounded-xl border border-gray-300 p-5 shadow-sm">

            {/* ITEM SUBTOTAL */}
            <div className="flex justify-between text-lg">
              <span className="text-[#4b6800]">
                Item Subtotal
              </span>

              <span className="font-semibold text-[#4b6800]">
                ₹ {itemSubtotal.toFixed(2)}
              </span>
            </div>

            {/* SERVICE FEE */}
            <div className="mt-7 flex justify-between text-lg">
              <span className="text-[#4b6800]">
                Service Fee
              </span>

              <span className="font-semibold text-[#4b6800]">
                ₹ {serviceFee.toFixed(2)}
              </span>
            </div>

            {/* TOTAL */}
            <div className="mt-7 flex justify-between text-lg">
              <span className="text-[#4b6800]">
                Subtotal
              </span>

              <span className="font-semibold text-[#4b6800]">
                ₹ {subtotal.toFixed(2)}
              </span>
            </div>

            {/* CHECKOUT */}
            <button
              className="mt-8 w-full rounded-lg bg-[#4b6800] py-4 font-semibold text-white hover:bg-[#3d5500]"
            >
              Go to Check Out
            </button>

            {/* TERMS */}
            <p className="mt-5 text-sm leading-5 text-gray-700">
              By placing your order, you agree to be
              bound by the Noon Herb{" "}
              <span className="text-[#4b6800] underline">
                Terms of Service
              </span>{" "}
              and{" "}
              <span className="text-[#4b6800] underline">
                Privacy Policy
              </span>.
            </p>

            {/* PROMO */}
            <h3 className="mt-8 text-2xl font-medium text-[#4b6800]">
              Add Promo or Gift Card
            </h3>

            <label className="mt-6 block text-lg text-[#4b6800]">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your Email Address"
              className="mt-3 w-full rounded-lg border border-gray-200 px-5 py-4 outline-none shadow-sm focus:border-[#4b6800]"
            />

            <button
              className="mt-5 w-full rounded-lg bg-[#4b6800] py-4 font-semibold text-white hover:bg-[#3d5500]"
            >
              Redeem
            </button>

            <p className="mt-5 text-sm text-[#4b6800]">
              Terms & Conditions apply
            </p>

          </div>

        </div>

      </div>

    </main>
  );
};

export default CartComponent;