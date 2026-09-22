import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

const ProductCarousel = ({
  title,
  products = [],
  onAddToCart,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);

  // Number of products visible at once
  const visibleProducts = 4;

  // Maximum slide position
  const maxIndex = Math.max(
    products.length - visibleProducts,
    0
  );

  // Favorite
  const handleFavorite = (product) => {
    setFavorites((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Previous
  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return 0;
      }

      return prev - 1;
    });
  };

  // Next
  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return maxIndex;
      }

      return prev + 1;
    });
  };

  if (!products.length) {
    return null;
  }

  return (
    <section className="w-full py-10">

      {/* Title */}
      <h2 className="mb-8 text-center text-3xl font-bold text-[#486400] md:text-4xl">
        {title}
      </h2>

      <div className="relative mx-auto w-full max-w-[1200px] px-10 sm:px-12 md:px-14">

        {/* LEFT BUTTON */}
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          aria-label="Previous products"
          className={`absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-[3px] transition-all duration-200 ${
            currentIndex === 0
              ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400"
              : "border-[#4b6800] bg-white text-[#4b6800] hover:bg-[#4b6800] hover:text-white"
          }`}
        >
          <ChevronLeft
            size={28}
            strokeWidth={2.5}
          />
        </button>

        {/* VIEWPORT */}
        <div className="overflow-hidden">

          {/* SLIDER */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 25}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-full flex-shrink-0 px-2 sm:w-1/2 lg:w-1/4"
              >
                <ProductCard
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onFavorite={handleFavorite}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT BUTTON */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          aria-label="Next products"
          className={`absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-[3px] transition-all duration-200 ${
            currentIndex === maxIndex
              ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400"
              : "border-[#4b6800] bg-white text-[#4b6800] hover:bg-[#4b6800] hover:text-white"
          }`}
        >
          <ChevronRight
            size={28}
            strokeWidth={2.5}
          />
        </button>

      </div>
    </section>
  );
};

export default ProductCarousel;