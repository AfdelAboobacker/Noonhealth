import { useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";

const ProductViewComponent = ({
  product,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(
    product?.image
  );
  const [activeTab, setActiveTab] = useState(
    "Product Details"
  );

  if (!product) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-xl text-gray-500">
          Product not found
        </p>
      </div>
    );
  }

  // CURRENTLY YOU HAVE ONLY ONE IMAGE
  const images = [product.image];

  // INCREASE
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  // DECREASE
  const decreaseQuantity = () => {
    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );
  };

  // ADD TO CART
  const handleAddToCart = () => {
    onAddToCart?.(product, quantity);
  };

  return (
    <main className="mx-auto max-w-[1200px] px-5 py-8 md:px-8">

      {/* TOP SECTION */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

        {/* ================= PRODUCT IMAGE ================= */}
        <div>

          {/* MAIN IMAGE */}
          <div className="flex h-[350px] items-center justify-center rounded-lg border border-gray-200 md:h-[430px]">
            <img
              src={activeImage}
              alt={product.name}
              className="h-full w-full object-contain"
            />
          </div>

          {/* THUMBNAIL */}
          <div className="mt-3 flex gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() =>
                  setActiveImage(image)
                }
                className={`
                  h-[90px]
                  w-[105px]
                  overflow-hidden
                  rounded-lg
                  border
                  p-1

                  ${
                    activeImage === image
                      ? "border-[#4b6800]"
                      : "border-gray-200"
                  }
                `}
              >
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="h-full w-full object-contain"
                />
              </button>
            ))}
          </div>

        </div>

        {/* ================= PRODUCT INFORMATION ================= */}
        <div>

          {/* NAME */}
          <h1 className="text-xl font-medium leading-7 text-[#4b6800] md:text-2xl">
            {product.name}
          </h1>

          {/* RATING */}
          <div className="mt-5 flex items-center gap-3">

            <div className="text-2xl text-[#ffbd32]">
              ★★★★★
            </div>

            <span className="text-sm text-gray-600">
              ({product.reviews || 305} Review)
            </span>

          </div>

          {/* PRICE */}
          <div className="mt-6 flex flex-wrap items-center gap-3">

            <span className="text-xl font-medium text-[#4b6800]">
              ₹ {product.price}
            </span>

            <span className="text-lg text-gray-500 line-through">
              ₹ {product.oldPrice}
            </span>

            <span className="text-red-500">
              {product.discount}% off
            </span>

          </div>

          {/* QUANTITY */}
          <div className="mt-6 flex h-10 w-[128px] overflow-hidden rounded-md">

            {/* MINUS */}
            <button
              type="button"
              onClick={decreaseQuantity}
              className="flex w-10 items-center justify-center bg-[#4b6800] text-white hover:bg-[#3d5500]"
            >
              <Minus size={17} />
            </button>

            {/* NUMBER */}
            <span className="flex flex-1 items-center justify-center border-y border-gray-300">
              {quantity}
            </span>

            {/* PLUS */}
            <button
              type="button"
              onClick={increaseQuantity}
              className="flex w-10 items-center justify-center bg-[#4b6800] text-white hover:bg-[#3d5500]"
            >
              <Plus size={17} />
            </button>

          </div>

          {/* BUTTONS */}
          <div className="mt-5 flex gap-3">

            {/* ADD TO CART */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="
                flex
                h-10
                flex-1
                items-center
                justify-center
                gap-2
                rounded-md
                bg-[#4b6800]
                text-sm
                font-medium
                text-white
                transition
                hover:bg-[#3d5500]
              "
            >
              <ShoppingBag size={18} />

              Add to Cart
            </button>

            {/* WISHLIST */}
            <button
              type="button"
              className="
                flex
                h-10
                w-12
                items-center
                justify-center
                rounded-md
                bg-[#4b6800]
                text-white
                hover:bg-[#3d5500]
              "
            >
              <Heart size={22} />
            </button>

          </div>

          <hr className="my-5 border-gray-300" />

          {/* PRODUCT META */}
          <div className="space-y-5 text-gray-600">

            <p>
              <span className="font-medium">
                Product Code:
              </span>{" "}
              {product.productCode || "FBB00255"}
            </p>

            <p>
              <span className="font-medium">
                Availability:
              </span>{" "}
              {product.availability || "In Stock"}
            </p>

            <p>
              <span className="font-medium">
                Shipping:
              </span>{" "}
              {product.shipping || "3 to 4 Days"}
            </p>

          </div>

        </div>
      </div>

      {/* ================= DETAILS ================= */}
      <div className="mt-10">

        {/* TABS */}
        <div className="flex gap-8 overflow-x-auto border-b border-[#7ca51c]">

          {[
            "Product Details",
            "Information",
            "Reviews",
            "Seller Info",
          ].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap
                pb-3
                text-sm
                md:text-base

                ${
                  activeTab === tab
                    ? "font-medium text-[#4b6800]"
                    : "text-[#7ca51c]"
                }
              `}
            >
              {tab}
            </button>
          ))}

        </div>

        {/* PRODUCT DETAILS */}
        {activeTab === "Product Details" && (
          <div className="mt-6 space-y-7 text-gray-600">

            <div>
              <h3 className="font-semibold text-[#4b6800]">
                Nutrient Value & Benefits
              </h3>

              <p className="mt-1 leading-6">
                Lorem ipsum dolor sit amet,
                consectetur adipiscing elit. Nisi,
                tellus iaculis urna bibendum in lacus,
                integer. Id imperdiet vitae varius sed
                magnis eu nisi nunc sit.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#4b6800]">
                Storage Tips
              </h3>

              <p className="mt-1 leading-6">
                Nisi, tellus iaculis urna bibendum in
                lacus, integer. Id imperdiet vitae
                varius sed magnis.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#4b6800]">
                Unit
              </h3>

              <p>
                {product.unit || "3 units"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#4b6800]">
                Seller
              </h3>

              <p>
                {product.seller || "DMart Pvt. LTD"}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-[#4b6800]">
                Disclaimer
              </h3>

              <p className="leading-6">
                Image shown is a representation and
                may slightly vary from the actual
                product. Every effort is made to
                maintain accuracy of all information
                displayed.
              </p>
            </div>

          </div>
        )}

        {/* INFORMATION */}
        {activeTab === "Information" && (
          <div className="mt-6 text-gray-600">
            Product information goes here.
          </div>
        )}

        {/* REVIEWS */}
        {activeTab === "Reviews" && (
          <div className="mt-6 text-gray-600">
            Customer reviews go here.
          </div>
        )}

        {/* SELLER INFO */}
        {activeTab === "Seller Info" && (
          <div className="mt-6 text-gray-600">
            Seller information goes here.
          </div>
        )}

      </div>

    </main>
  );
};

export default ProductViewComponent;