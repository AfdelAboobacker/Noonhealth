import React from "react";
import Sidebar from "./Sidebar";

const OrderComponent = ({ orders = [] }) => {
  /*
   * Convert orders saved by Checkout.jsx
   * into the format needed by this component.
   */
  const formattedOrders = orders.flatMap((order) => {
    if (!order.products || order.products.length === 0) {
      return [];
    }

    return order.products.map((product) => ({
      id: `${order.id}-${product.id}`,
      image: product.image,
      product: product.name,
      orderId: order.id,

      date: new Date(order.orderDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),

      item: product.quantity,
      status: order.status || "Placed",
      amount: `₹${product.itemTotal}`,
    }));
  });

  return (
    <section className="w-full min-h-screen bg-white px-4 sm:px-6 lg:px-16 py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-6">

        {/* ================================================= */}
        {/* REUSABLE SIDEBAR */}
        {/* ================================================= */}
        <Sidebar activeItem="Your Orders" />

        {/* ================================================= */}
        {/* ORDERS CONTENT */}
        {/* ================================================= */}
        <main className="flex-1 min-w-0">

          {/* Heading */}
          <h1 className="text-[#456600] text-[22px] sm:text-[24px] font-semibold mb-5">
            Your Orders
          </h1>

          {/* ================================================= */}
          {/* NO ORDERS */}
          {/* ================================================= */}
          {formattedOrders.length === 0 ? (
            <div className="border border-gray-100 rounded-lg p-8 sm:p-10 text-center">
              <p className="text-gray-500 text-base sm:text-lg">
                You haven't placed any orders yet.
              </p>
            </div>
          ) : (
            <>
              {/* ================================================= */}
              {/* TABLE HEADER */}
              {/* ================================================= */}
              <div
                className="
                  hidden
                  md:grid
                  grid-cols-[2.7fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr]
                  items-center
                  bg-[#96B532]
                  text-white
                  min-h-[49px]
                  px-5
                  text-[16px]
                  lg:text-[18px]
                  font-medium
                "
              >
                <span>Product</span>
                <span>Order Id</span>
                <span>Date</span>
                <span>Item</span>
                <span>Status</span>
                <span>Amount</span>
              </div>

              {/* ================================================= */}
              {/* ORDER LIST */}
              {/* ================================================= */}
              <div className="w-full">
                {formattedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="
                      grid
                      grid-cols-1
                      md:grid-cols-[2.7fr_0.8fr_0.8fr_0.8fr_0.8fr_0.8fr]
                      items-center
                      min-h-[97px]
                      px-4
                      sm:px-5
                      py-4
                      border-b
                      border-gray-100
                      text-[#555]
                    "
                  >

                    {/* Product */}
                    <div className="flex items-center gap-4 sm:gap-5">
                      <img
                        src={order.image}
                        alt={order.product}
                        className="
                          w-[50px]
                          h-[70px]
                          object-contain
                          shrink-0
                        "
                      />

                      <p
                        className="
                          text-[#456600]
                          text-[16px]
                          sm:text-[18px]
                          leading-[25px]
                          sm:leading-[27px]
                        "
                      >
                        {order.product}
                      </p>
                    </div>

                    {/* Order ID */}
                    <div
                      className="
                        text-[16px]
                        sm:text-[17px]
                        text-[#666]
                        mt-2
                        md:mt-0
                      "
                    >
                      <span className="md:hidden font-semibold text-[#456600]">
                        Order Id:{" "}
                      </span>

                      #{order.orderId}
                    </div>

                    {/* Date */}
                    <div
                      className="
                        text-[16px]
                        sm:text-[17px]
                        text-[#666]
                        mt-2
                        md:mt-0
                      "
                    >
                      <span className="md:hidden font-semibold text-[#456600]">
                        Date:{" "}
                      </span>

                      {order.date}
                    </div>

                    {/* Item */}
                    <div
                      className="
                        text-[16px]
                        sm:text-[17px]
                        text-[#666]
                        mt-2
                        md:mt-0
                      "
                    >
                      <span className="md:hidden font-semibold text-[#456600]">
                        Item:{" "}
                      </span>

                      {order.item}
                    </div>

                    {/* Status */}
                    <div
                      className={`
                        text-[16px]
                        sm:text-[17px]
                        mt-2
                        md:mt-0
                        ${
                          order.status === "Cancelled"
                            ? "text-red-500"
                            : "text-[#456600]"
                        }
                      `}
                    >
                      <span className="md:hidden font-semibold text-[#456600]">
                        Status:{" "}
                      </span>

                      {order.status}
                    </div>

                    {/* Amount */}
                    <div
                      className="
                        text-[16px]
                        sm:text-[17px]
                        text-[#666]
                        mt-2
                        md:mt-0
                      "
                    >
                      <span className="md:hidden font-semibold text-[#456600]">
                        Amount:{" "}
                      </span>

                      {order.amount}
                    </div>

                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </section>
  );
};

export default OrderComponent;