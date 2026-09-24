import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

const ProductCarousel = ({ title, products = [], onAddToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(4);

  // Dragging states
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const startX = useRef(0);

  // Responsive number of visible products
  useEffect(() => {
    const updateVisibleProducts = () => {
      if (window.innerWidth < 640) {
        // Small screen
        setVisibleProducts(2);
      } else if (window.innerWidth < 1024) {
        // Medium screen
        setVisibleProducts(3);
      } else {
        // Large screen
        setVisibleProducts(4);
      }
    };

    updateVisibleProducts();

    window.addEventListener("resize", updateVisibleProducts);

    return () => {
      window.removeEventListener("resize", updateVisibleProducts);
    };
  }, []);

  // Maximum carousel position
  const maxIndex = Math.max(products.length - visibleProducts, 0);

  // Favorite
  const handleFavorite = (product) => {
    setFavorites((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id],
    );
  };

  // Previous
  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Next
  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  // Make sure index is valid when screen size changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [visibleProducts, maxIndex]);

  // =========================
  // TOUCH / POINTER START
  // =========================

  const handlePointerDown = (e) => {
    startX.current = e.clientX;

    setIsDragging(true);
    setDragOffset(0);

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  // =========================
  // TOUCH / POINTER MOVE
  // =========================

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const currentX = e.clientX;
    const difference = currentX - startX.current;

    setDragOffset(difference);
  };

  // =========================
  // TOUCH / POINTER END
  // =========================

  const handlePointerUp = (e) => {
    if (!isDragging) return;

    const difference = e.clientX - startX.current;

    const minimumSwipeDistance = 50;

    if (difference < -minimumSwipeDistance) {
      // Swipe left
      handleNext();
    } else if (difference > minimumSwipeDistance) {
      // Swipe right
      handlePrevious();
    }

    setIsDragging(false);
    setDragOffset(0);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore if pointer capture was already released
    }
  };

  // Cancel drag
  const handlePointerCancel = () => {
    setIsDragging(false);
    setDragOffset(0);
  };

  if (!products.length) {
    return null;
  }

  // Normal position
  const normalPosition =
    currentIndex * (100 / visibleProducts);

  return (
    <section className="w-full py-8 sm:py-10">

      {/* Title */}
      <h2
        className="
          mb-6
          text-center
          text-2xl
          font-bold
          text-[#486400]

          sm:mb-8
          sm:text-3xl

          md:text-4xl
        "
      >
        {title}
      </h2>

      {/* Carousel Container */}
      <div
        className="
          relative
          mx-auto
          w-full
          max-w-[1200px]
          px-9

          sm:px-11

          md:px-12

          lg:px-14
        "
      >

        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          aria-label="Previous products"
          className={`
            absolute
            left-0
            top-1/2
            z-20

            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center

            rounded-full
            border-2

            transition-all
            duration-200

            sm:h-10
            sm:w-10

            md:h-11
            md:w-11
            md:border-[3px]

            ${
              currentIndex === 0
                ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400"
                : "border-[#4b6800] bg-white text-[#4b6800] hover:bg-[#4b6800] hover:text-white"
            }
          `}
        >
          <ChevronLeft
            size={22}
            className="sm:h-6 sm:w-6 md:h-7 md:w-7"
            strokeWidth={2.5}
          />
        </button>

        {/* Products */}
        <div
          className="
            overflow-hidden
            touch-pan-y
            select-none
          "
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >
          <div
            className={`
              flex
              ${
                isDragging
                  ? "cursor-grabbing"
                  : "cursor-grab"
              }
              ${
                isDragging
                  ? ""
                  : "transition-transform duration-500 ease-out"
              }
            `}
            style={{
              transform: `
                translateX(
                  calc(
                    -${normalPosition}% + ${dragOffset}px
                  )
                )
              `,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="
                  w-1/2
                  flex-shrink-0
                  px-1.5

                  sm:w-1/2
                  sm:px-2

                  md:w-1/3

                  lg:w-1/4
                "
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

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex === maxIndex}
          aria-label="Next products"
          className={`
            absolute
            right-0
            top-1/2
            z-20

            flex
            h-9
            w-9
            -translate-y-1/2
            items-center
            justify-center

            rounded-full
            border-2

            transition-all
            duration-200

            sm:h-10
            sm:w-10

            md:h-11
            md:w-11
            md:border-[3px]

            ${
              currentIndex === maxIndex
                ? "cursor-not-allowed border-gray-300 bg-gray-100 text-gray-400"
                : "border-[#4b6800] bg-white text-[#4b6800] hover:bg-[#4b6800] hover:text-white"
            }
          `}
        >
          <ChevronRight
            size={22}
            className="sm:h-6 sm:w-6 md:h-7 md:w-7"
            strokeWidth={2.5}
          />
        </button>

      </div>
    </section>
  );
};

export default ProductCarousel;