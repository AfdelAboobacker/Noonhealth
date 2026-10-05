import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";

import ProductCard from "./ProductCard";

import newArrivals from "../data/newarrival";
import recentProducts from "../data/recent";

const PRODUCTS_PER_PAGE = 18;

const SeeAllComponent = ({ onAddToCart = () => {} }) => {
  // ==================================================
  // PRODUCT DATA
  // ==================================================

  const productData = {
    Recent: recentProducts,
    NewArrival: newArrivals,
  };

  // ==================================================
  // STATES
  // ==================================================

  const [sortType, setSortType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const [categoryOpen, setCategoryOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [resellerOpen, setResellerOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  // ==================================================
  // CATEGORIES
  // ==================================================

  const categories = [
    "Vitamins",
    "Minerals",
    "Digestive Support",
    "Bone & Joint",
    "Sleep",
    "Children's Health",
    "Hair, Skin & Nails",
    "Brain & Cognitive",
    "Protein",
  ];

  // ==================================================
  // SORT
  // ==================================================

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    setCurrentPage(1);
  };

  const products = useMemo(() => {
    if (sortType === "All") {
      return [...recentProducts, ...newArrivals];
    }

    return productData[sortType] || [];
  }, [sortType]);

  // ==================================================
  // PAGINATION
  // ==================================================

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const safeCurrentPage =
    totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

  const startIndex = (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  // ==================================================
  // FAVORITES
  // ==================================================

  const handleFavorite = (product) => {
    setFavorites((previousFavorites) => {
      if (previousFavorites.includes(product.id)) {
        return previousFavorites.filter((id) => id !== product.id);
      }

      return [...previousFavorites, product.id];
    });
  };

  // ==================================================
  // FILTER CONTENT
  // ==================================================

  const FilterContent = () => (
    <div className="w-full">
      {/* Categories */}
      <div className="border-b border-white/70 pb-2">
        <button
          type="button"
          onClick={() => setCategoryOpen(!categoryOpen)}
          className="
            flex
            w-full
            items-center
            justify-between
            text-left
            text-sm
            font-semibold
            text-white
          "
        >
          <span>Categories</span>

          {categoryOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
        </button>

        {categoryOpen && (
          <div className="mt-2 space-y-1">
            {/* All Categories */}
            <button
              type="button"
              onClick={() => setSelectedCategory("All Categories")}
              className={`
                block
                w-full
                text-left
                text-sm
                transition
                hover:font-semibold
                ${selectedCategory === "All Categories" ? "font-semibold" : ""}
              `}
            >
              All Categories
            </button>

            {/* Categories */}
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`
                  block
                  w-full
                  text-left
                  text-sm
                  transition
                  hover:font-semibold
                  ${selectedCategory === category ? "font-semibold" : ""}
                `}
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Brand */}
      <FilterSection title="Brand" open={brandOpen} setOpen={setBrandOpen}>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Himalaya
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Dabur
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Patanjali
          </label>
        </div>
      </FilterSection>

      {/* Gender */}
      <FilterSection title="Gender" open={genderOpen} setOpen={setGenderOpen}>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Men
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Women
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Unisex
          </label>
        </div>
      </FilterSection>

      {/* Reseller */}
      <FilterSection
        title="Reseller"
        open={resellerOpen}
        setOpen={setResellerOpen}
      >
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Official Store
          </label>

          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Verified Seller
          </label>
        </div>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price" open={priceOpen} setOpen={setPriceOpen}>
        <div className="px-1 pt-2">
          <div className="relative h-6">
            {/* Background line */}
            <div
              className="
                absolute
                left-0
                right-0
                top-2
                h-1
                rounded-full
                bg-white
              "
            />

            {/* Selected range */}
            <div
              className="
                absolute
                left-[20%]
                right-[15%]
                top-2
                h-1
                rounded-full
                bg-[#486400]
              "
            />

            {/* Left handle */}
            <div
              className="
                absolute
                left-[20%]
                top-0
                h-5
                w-5
                rounded-full
                border-2
                border-[#486400]
                bg-white
              "
            />

            {/* Right handle */}
            <div
              className="
                absolute
                right-[15%]
                top-0
                h-5
                w-5
                rounded-full
                border-2
                border-[#486400]
                bg-white
              "
            />
          </div>

          <div
            className="
              flex
              justify-between
              text-[10px]
              font-semibold
            "
          >
            <span>200</span>
            <span>1500</span>
          </div>
        </div>
      </FilterSection>

      {/* Rating */}
      <FilterSection
        title="Rating"
        open={ratingOpen}
        setOpen={setRatingOpen}
        border={false}
      >
        <div className="space-y-1 text-lg leading-none">
          <div className="flex gap-1">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>

          <div className="flex gap-1">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>☆</span>
          </div>

          <div className="flex gap-1">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>☆</span>
            <span>☆</span>
          </div>
        </div>
      </FilterSection>
    </div>
  );

  // ==================================================
  // PRODUCT ITEM
  // ==================================================

  const ProductItem = ({ product }) => (
    <ProductCard
      product={product}
      isFavorite={favorites.includes(product.id)}
      onFavorite={handleFavorite}
      onAddToCart={onAddToCart}
    />
  );

  // ==================================================
  // PRODUCT GRID
  // ==================================================

  const ProductGrid = ({ productList }) => {
    if (!productList.length) {
      return null;
    }

    return (
      <div
        className="
          grid
          grid-cols-2
          gap-2

          sm:grid-cols-2
          sm:gap-3

          md:grid-cols-3
          md:gap-4

          lg:grid-cols-3
          lg:gap-3

          xl:grid-cols-3
          xl:gap-4
        "
      >
        {productList.map((product) => (
          <div key={product.id}>
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    );
  };

  // ==================================================
  // MOBILE + TABLET PRODUCTS
  // ==================================================

  const MobileTabletProducts = () => {
    const firstProducts = currentProducts.slice(0, 6);
    const remainingProducts = currentProducts.slice(6);

    return (
      <div className="lg:hidden">
        {/* First 6 products */}
        <ProductGrid productList={firstProducts} />

        {/* ONE NEEM AD PER PAGE */}
        {firstProducts.length > 0 && (
          <div
            className="
              my-5
              overflow-hidden
              rounded-[14px]

              sm:my-6
              sm:rounded-[16px]

              md:my-7
            "
          >
            <img
              src="/images/ad/Herb-Neem.png"
              alt="Natural Herbal Extract"
              className="
                h-auto
                w-full
                object-cover
              "
            />
          </div>
        )}

        {/* Remaining products */}
        <ProductGrid productList={remainingProducts} />
      </div>
    );
  };

  // ==================================================
  // DESKTOP PRODUCTS
  // ==================================================

  const DesktopProducts = () => {
    const firstProducts = currentProducts.slice(0, 9);
    const remainingProducts = currentProducts.slice(9);

    return (
      <div className="hidden lg:block">
        {/* First 9 products */}
        <ProductGrid productList={firstProducts} />

        {/* ONE NEEM AD PER PAGE */}
        {firstProducts.length > 0 && (
          <div
            className="
              my-5
              overflow-hidden
              rounded-[14px]

              xl:my-6
              xl:rounded-[16px]
            "
          >
            <img
              src="/images/ad/Herb-Neem.png"
              alt="Natural Herbal Extract"
              className="
                h-auto
                w-full
                object-cover
              "
            />
          </div>
        )}

        {/* Remaining products */}
        <ProductGrid productList={remainingProducts} />
      </div>
    );
  };

  // ==================================================
  // PAGINATION
  // ==================================================

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (safeCurrentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (safeCurrentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      safeCurrentPage - 1,
      safeCurrentPage,
      safeCurrentPage + 1,
      "...",
      totalPages,
    ];
  };

  // ==================================================
  // MAIN
  // ==================================================

  return (
    <section className="w-full bg-white">
      <div
        className="
          mx-auto
          w-full
          max-w-[1400px]
          px-4
          py-4

          sm:px-6
          sm:py-6

          md:px-8

          lg:px-10

          xl:px-12
        "
      >
        {/* ==========================================
            MOBILE FILTER BUTTON
        ========================================== */}

        <div className="mb-4 sm:mb-5 lg:hidden">
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="
              flex
              w-full
              items-center
              justify-between
              rounded-xl
              bg-[#9abb35]
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
            "
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal size={18} />
              Customize Selection
            </span>

            {showFilters ? <X size={20} /> : <ChevronDown size={20} />}
          </button>

          {/* Mobile Filters */}
          {showFilters && (
            <div
              className="
                mt-2
                rounded-xl
                bg-[#9abb35]
                p-4
                text-white
                shadow-md
              "
            >
              <FilterContent />
            </div>
          )}
        </div>

        {/* ==========================================
            MAIN LAYOUT
        ========================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-4

            lg:grid-cols-[142px_minmax(0,1fr)]

            xl:grid-cols-[160px_minmax(0,1fr)]
            xl:gap-5
          "
        >
          {/* ========================================
              LEFT SIDEBAR
          ======================================== */}

          <aside
            className="
              hidden
              lg:block

              /*
                Move the entire left sidebar down so
                Categories starts at the same level
                as the first product row.
              */
              pt-[52px]
            "
          >
            {/* Filters */}
            <div
              className="
                rounded-[14px]
                bg-[#9abb35]
                p-3
                text-white

                xl:p-4
              "
            >
              <FilterContent />
            </div>

            {/* Side Ad 1 */}
            <div
              className="
                mt-3
                overflow-hidden
                rounded-[14px]
              "
            >
              <img
                src="/images/ad/Herb-Shampoo.png"
                alt="Herbal Shampoo"
                className="
                  block
                  h-auto
                  w-full
                  object-cover
                "
              />
            </div>

            {/* Side Ad 2 */}
            <div
              className="
                mt-3
                overflow-hidden
                rounded-[14px]
              "
            >
              <img
                src="/images/ad/whey.png"
                alt="Whey Protein"
                className="
                  block
                  h-auto
                  w-full
                  object-cover
                "
              />
            </div>
          </aside>

          {/* ========================================
              CENTER CONTENT
          ======================================== */}

          <main className="min-w-0">
            {/* ======================================
                TOP CONTROLS
            ====================================== */}

            <div
              className="
                mb-4
                flex
                items-center
                justify-between
                gap-2

                sm:mb-5
              "
            >
              {/* Product Count */}
              <div
                className="
                  rounded-md
                  bg-[#9abb35]
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  text-white

                  sm:px-4
                  sm:text-sm
                "
              >
                Show: {products.length}
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sortType}
                  onChange={handleSortChange}
                  className="
                    cursor-pointer
                    appearance-none
                    rounded-md
                    bg-[#9abb35]
                    py-2
                    pl-3
                    pr-8
                    text-xs
                    font-semibold
                    text-white
                    outline-none

                    sm:pl-4
                    sm:pr-9
                    sm:text-sm
                  "
                >
                  <option value="All">Sort by: All</option>

                  <option value="Recent">Sort by: Recent</option>

                  <option value="NewArrival">Sort by: New Arrival</option>
                </select>

                <ChevronDown
                  size={16}
                  className="
                    pointer-events-none
                    absolute
                    right-2
                    top-1/2
                    -translate-y-1/2
                    text-white
                  "
                />
              </div>
            </div>

            {/* ======================================
                MOBILE + TABLET
            ====================================== */}

            <MobileTabletProducts />

            {/* ======================================
                DESKTOP
            ====================================== */}

            <DesktopProducts />

            {/* ======================================
                PAGINATION
            ====================================== */}

            {totalPages > 1 && (
              <div
                className="
                  mt-6
                  flex
                  justify-center
                "
              >
                <div
                  className="
                    flex
                    overflow-hidden
                    rounded-md
                    border
                    border-[#4b6800]
                  "
                >
                  {/* PREVIOUS */}
                  <button
                    type="button"
                    disabled={safeCurrentPage === 1}
                    onClick={() =>
                      setCurrentPage((previousPage) =>
                        Math.max(previousPage - 1, 1),
                      )
                    }
                    className="
                      flex
                      h-8
                      w-10
                      items-center
                      justify-center
                      bg-[#4b6800]
                      text-white

                      disabled:cursor-not-allowed
                      disabled:opacity-50

                      sm:h-9
                      sm:w-12
                    "
                  >
                    ‹
                  </button>

                  {/* PAGE NUMBERS */}
                  {getPageNumbers().map((page, index) => {
                    if (page === "...") {
                      return (
                        <span
                          key={`ellipsis-${index}`}
                          className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            border-l
                            border-[#4b6800]
                            bg-white
                            text-xs
                            font-semibold
                            text-[#4b6800]

                            sm:h-9
                            sm:w-10
                            sm:text-sm
                          "
                        >
                          ...
                        </span>
                      );
                    }

                    return (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setCurrentPage(page)}
                        className={`
                          flex
                          h-8
                          w-10
                          items-center
                          justify-center
                          border-l
                          border-[#4b6800]
                          text-xs
                          font-semibold

                          sm:h-9
                          sm:w-12
                          sm:text-sm

                          ${
                            safeCurrentPage === page
                              ? "bg-[#4b6800] text-white"
                              : "bg-white text-[#4b6800] hover:bg-[#eef4d8]"
                          }
                        `}
                      >
                        {page}
                      </button>
                    );
                  })}

                  {/* NEXT */}
                  <button
                    type="button"
                    disabled={safeCurrentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((previousPage) =>
                        Math.min(previousPage + 1, totalPages),
                      )
                    }
                    className="
                      flex
                      h-8
                      w-10
                      items-center
                      justify-center
                      border-l
                      border-[#4b6800]
                      bg-[#4b6800]
                      text-white

                      disabled:cursor-not-allowed
                      disabled:opacity-50

                      sm:h-9
                      sm:w-12
                    "
                  >
                    ›
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

// ======================================================
// REUSABLE FILTER SECTION
// ======================================================

const FilterSection = ({ title, open, setOpen, children, border = true }) => {
  return (
    <div className={`py-2 ${border ? "border-b border-white/70" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="
          flex
          w-full
          items-center
          justify-between
          text-sm
          font-semibold
          text-white
        "
      >
        <span>{title}</span>

        {open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
      </button>

      {open && <div className="mt-2">{children}</div>}
    </div>
  );
};

export default SeeAllComponent;
