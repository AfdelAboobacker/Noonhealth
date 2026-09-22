import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  // =========================
  // SLIDE 1 - IMAGE ONLY
  // =========================
  {
    type: "banner",
    banner: "/images/banner/banner1.png",
  },

  // =========================
  // SLIDE 2 - PRODUCT
  // =========================
  {
    type: "product",
    banner: "/images/banner/bannerbg1.jpg",
    product: "/images/banner/product/honejar.jpg",
    title: "Herbal Formulation – Medicine of your Healthy Life",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },

  // =========================
  // SLIDE 3 - PRODUCT
  // =========================
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

  // =========================
  // AUTO SLIDESHOW
  // =========================
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // NEXT
  // =========================
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // =========================
  // PREVIOUS
  // =========================
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden">
      {/* =====================================================
          SLIDES
      ====================================================== */}
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
          {/* =================================================
              SLIDE 1
              IMAGE ONLY
          ================================================== */}
          {slide.type === "banner" && (
            <img
              src={slide.banner}
              alt="Banner"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* =================================================
              SLIDE 2 & 3
              PRODUCT BANNERS
          ================================================== */}
          {slide.type === "product" && (
            <div className="relative w-full h-full">
              {/* ---------------------------------------------
                  BACKGROUND IMAGE
              ---------------------------------------------- */}
              <img
                src={slide.banner}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* ---------------------------------------------
                  OPTIONAL OVERLAY
                  Reduce opacity if your background is already dark
              ---------------------------------------------- */}
              <div className="absolute inset-0 bg-black/20" />

              {/* ---------------------------------------------
                  CONTENT AREA

                  pt-[150px] = navbar height
              ---------------------------------------------- */}
              <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 lg:px-10 pt-[150px]">
                <div className="h-full grid grid-cols-1 lg:grid-cols-2 items-center gap-6 pb-16">
                  {/* =========================================
                      LEFT SIDE
                  ========================================== */}
                  <div className="text-white max-w-xl">
                    {/* TITLE */}
                    <h1
                      className="
                        text-3xl
                        sm:text-4xl
                        lg:text-5xl
                        font-bold
                        leading-tight
                        mb-5
                      "
                    >
                      {slide.title}
                    </h1>

                    {/* DESCRIPTION */}
                    <p
                      className="
                        text-base
                        sm:text-lg
                        leading-relaxed
                        text-white/90
                        max-w-lg
                        mb-7
                      "
                    >
                      {slide.description}
                    </p>

                    {/* SHOP NOW */}
                    <button
                      type="button"
                      className="
                        inline-flex
                        items-center
                        justify-center
                        px-7
                        py-3
                        rounded-lg
                        bg-lime-500
                        hover:bg-lime-600
                        text-white
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

                  {/* =========================================
                      RIGHT SIDE
                      CIRCULAR PRODUCT IMAGE
                  ========================================== */}
                  <div className="flex justify-center lg:justify-end">
                    <div
                      className="
                        w-[220px]
                        h-[220px]

                        sm:w-[280px]
                        sm:h-[280px]

                        md:w-[330px]
                        md:h-[330px]

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

      {/* =====================================================
          PREVIOUS BUTTON
      ====================================================== */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous slide"
        className="
          absolute
          left-4
          lg:left-8
          top-1/2
          -translate-y-1/2
          z-30

          w-10
          h-10

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
        <ChevronLeft size={32} strokeWidth={1.5} />
      </button>

      {/* =====================================================
          NEXT BUTTON
      ====================================================== */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="
          absolute
          right-4
          lg:right-8
          top-1/2
          -translate-y-1/2
          z-30

          w-10
          h-10

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
        <ChevronRight size={32} strokeWidth={1.5} />
      </button>

      {/* =====================================================
          SLIDE INDICATORS
      ====================================================== */}
      <div
        className="
          absolute
          bottom-6
          left-1/2
          -translate-x-1/2
          z-30

          flex
          items-center
          gap-3
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
                  ? "w-8 h-3 bg-lime-500"
                  : "w-3 h-3 bg-white/80 hover:bg-white"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner;
