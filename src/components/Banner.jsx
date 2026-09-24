import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  // Slide 1
  {
    type: "banner",
    banner: "/images/banner/banner1.png",
  },

  // Slide 2
  {
    type: "product",
    banner: "/images/banner/bannerbg1.jpg",
    product: "/images/banner/product/honejar.jpg",
    title: "Herbal Formulation – Medicine of your Healthy Life",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },

  // Slide 3
  {
    type: "product",
    banner: "/images/banner/bannerbg2.png",
    product: "/images/banner/product/spicejar.jpg",
    title: "Natural Wellness for a Healthy Life",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section
      className="
        relative
        w-full

        h-[350px]
        sm:h-[380px]
        md:h-[450px]

        lg:h-[80vh]
        lg:min-h-[600px]

        overflow-hidden
      "
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`
            absolute inset-0
            transition-opacity duration-700 ease-in-out
            ${
              currentSlide === index
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }
          `}
        >
          {/* Normal Banner */}
          {slide.type === "banner" && (
            <img
              src={slide.banner}
              alt="Banner"
              className="
                absolute inset-0
                w-full h-full
                object-cover
              "
            />
          )}

          {/* Product Banner */}
          {slide.type === "product" && (
            <div className="relative w-full h-full">
              {/* Background */}
              <img
                src={slide.banner}
                alt=""
                className="
                  absolute inset-0
                  w-full h-full
                  object-cover
                "
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/20" />

              {/* Content */}
              <div
                className="
                  relative z-10
                  w-full h-full
                  max-w-7xl
                  mx-auto

                  px-5
                  sm:px-7
                  md:px-8
                  lg:px-10

                  pt-[75px]
                  sm:pt-[80px]
                  md:pt-[85px]
                  lg:pt-[90px]
                "
              >
                <div
                  className="
                    h-full

                    grid
                    grid-cols-1
                    md:grid-cols-2

                    items-center

                    gap-4
                    md:gap-6
                    lg:gap-10

                    pb-10
                    md:pb-12
                    lg:pb-16
                  "
                >
                  {/* TEXT + BUTTON */}
                  <div
                    className="
                      text-white
                      max-w-xl

                      text-center
                      md:text-left

                      mx-auto
                      md:mx-0
                    "
                  >
                    <h1
                      className="
                        text-xl
                        sm:text-2xl
                        md:text-3xl
                        lg:text-5xl

                        font-bold
                        leading-tight

                        mb-3
                        md:mb-4
                        lg:mb-5
                      "
                    >
                      {slide.title}
                    </h1>

                    <p
                      className="
                        text-xs
                        sm:text-sm
                        md:text-sm
                        lg:text-lg

                        leading-relaxed
                        text-white/90

                        max-w-lg

                        mx-auto
                        md:mx-0

                        mb-4
                        md:mb-5
                        lg:mb-7
                      "
                    >
                      {slide.description}
                    </p>

                    <button
                      type="button"
                      className="
                        inline-flex
                        items-center
                        justify-center

                        px-5
                        md:px-6
                        lg:px-7

                        py-2
                        md:py-2.5
                        lg:py-3

                        rounded-lg

                        bg-lime-500
                        hover:bg-lime-600

                        text-white

                        text-xs
                        md:text-sm
                        lg:text-base

                        font-semibold

                        transition-all
                        duration-300

                        hover:scale-105

                        shadow-lg
                      "
                    >
                      Shop Now
                    </button>
                  </div>

                  {/* PRODUCT IMAGE */}
                  <div
                    className="
                      hidden
                      md:flex

                      justify-center
                      md:justify-end

                      items-center
                    "
                  >
                    <div
                      className="
                        w-[220px]
                        h-[220px]

                        md:w-[260px]
                        md:h-[260px]

                        lg:w-[390px]
                        lg:h-[390px]

                        rounded-full

                        overflow-hidden

                        shadow-2xl

                        border-4
                        border-white/20
                      "
                    >
                      <img
                        src={slide.product}
                        alt={slide.title}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Previous Button */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="
          absolute

          left-2
          sm:left-3
          lg:left-8

          top-1/2
          -translate-y-1/2

          z-30

          w-8
          h-8

          sm:w-9
          sm:h-9

          lg:w-12
          lg:h-12

          flex
          items-center
          justify-center

          rounded-full

          bg-black/20
          hover:bg-black/40

          text-white

          transition-all
          duration-300

          hover:scale-110
        "
      >
        <ChevronLeft size={22} className="lg:w-8 lg:h-8" strokeWidth={1.5} />
      </button>

      {/* Next Button */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="
          absolute

          right-2
          sm:right-3
          lg:right-8

          top-1/2
          -translate-y-1/2

          z-30

          w-8
          h-8

          sm:w-9
          sm:h-9

          lg:w-12
          lg:h-12

          flex
          items-center
          justify-center

          rounded-full

          bg-black/20
          hover:bg-black/40

          text-white

          transition-all
          duration-300

          hover:scale-110
        "
      >
        <ChevronRight size={22} className="lg:w-8 lg:h-8" strokeWidth={1.5} />
      </button>

      {/* Dots */}
      <div
        className="
          absolute

          bottom-3
          sm:bottom-4
          lg:bottom-6

          left-1/2
          -translate-x-1/2

          z-30

          flex
          items-center
          gap-2
          sm:gap-3
        "
      >
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`
              rounded-full
              transition-all
              duration-300

              ${
                currentSlide === index
                  ? "w-6 sm:w-7 lg:w-8 h-2.5 sm:h-3 bg-lime-500"
                  : "w-2.5 sm:w-3 h-2.5 sm:h-3 bg-white/80 hover:bg-white"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
