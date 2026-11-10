import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown, ChevronUp, SlidersHorizontal, X } from "lucide-react";

import ProductCard from "./ProductCard";
import { getProducts } from "../api/productApi";

const PRODUCTS_PER_PAGE = 18;

const CATEGORIES = [
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

const getPrice = (product) =>
  Number(product?.price ?? product?.salePrice ?? product?.sellingPrice ?? 0);

const getCategory = (product) => {
  const category = product?.category ?? product?.categories ?? "";
  return Array.isArray(category) ? category : [category];
};

const getRating = (product) => Number(product?.rating ?? 0);

const getProductName = (product) => String(product?.name ?? "");

const getOptionValues = (products, fields) => {
  const values = products.flatMap((product) =>
    fields.flatMap((field) => {
      const value = product?.[field];
      return Array.isArray(value) ? value : value ? [value] : [];
    }),
  );

  return [...new Set(values.map(String))].sort((a, b) => a.localeCompare(b));
};

const SeaallComponet = ({ onAddToCart }) => {
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get("search") || "").trim();
  const isSearching = searchQuery.length > 0;

  const [sortType, setSortType] = useState("All");
  const [priceSort, setPriceSort] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [categoryOpen, setCategoryOpen] = useState(true);
  const [brandOpen, setBrandOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [resellerOpen, setResellerOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedResellers, setSelectedResellers] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minimumRating, setMinimumRating] = useState(0);

  // FETCH PRODUCTS FROM API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Unable to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // AVAILABLE FILTER OPTIONS
  const brands = useMemo(
    () => getOptionValues(allProducts, ["brand"]),
    [allProducts],
  );

  const genders = useMemo(
    () => getOptionValues(allProducts, ["gender"]),
    [allProducts],
  );

  const resellers = useMemo(
    () => getOptionValues(allProducts, ["reseller", "seller"]),
    [allProducts],
  );

  // FILTER AND SORT PRODUCTS
  const products = useMemo(() => {
    let result =
      sortType === "Recent"
        ? allProducts.filter((product) => product.category === "recent")
        : sortType === "NewArrival"
          ? allProducts.filter((product) => product.category === "newarrival")
          : [...allProducts];

    // SEARCH BY PRODUCT NAME
    if (isSearching) {
      const query = searchQuery.toLowerCase();

      result = result.filter((product) =>
        getProductName(product).toLowerCase().includes(query),
      );
    }

    // CATEGORY FILTER
    if (selectedCategory !== "All Categories") {
      result = result.filter((product) =>
        getCategory(product).some(
          (category) =>
            String(category).toLowerCase() === selectedCategory.toLowerCase(),
        ),
      );
    }

    // BRAND FILTER
    if (selectedBrands.length > 0) {
      result = result.filter((product) =>
        selectedBrands.includes(String(product.brand ?? "")),
      );
    }

    // GENDER FILTER
    if (selectedGenders.length > 0) {
      result = result.filter((product) =>
        selectedGenders.includes(String(product.gender ?? "")),
      );
    }

    // RESELLER FILTER
    if (selectedResellers.length > 0) {
      result = result.filter((product) =>
        selectedResellers.includes(
          String(product.reseller ?? product.seller ?? ""),
        ),
      );
    }

    // MINIMUM PRICE
    if (minPrice !== "") {
      result = result.filter(
        (product) => getPrice(product) >= Number(minPrice),
      );
    }

    // MAXIMUM PRICE
    if (maxPrice !== "") {
      result = result.filter(
        (product) => getPrice(product) <= Number(maxPrice),
      );
    }

    // RATING FILTER
    if (minimumRating > 0) {
      result = result.filter((product) => getRating(product) >= minimumRating);
    }

    // PRICE SORTING
    if (priceSort === "lowToHigh") {
      result.sort((a, b) => getPrice(a) - getPrice(b));
    } else if (priceSort === "highToLow") {
      result.sort((a, b) => getPrice(b) - getPrice(a));
    }

    return result;
  }, [
    allProducts,
    sortType,
    priceSort,
    isSearching,
    searchQuery,
    selectedCategory,
    selectedBrands,
    selectedGenders,
    selectedResellers,
    minPrice,
    maxPrice,
    minimumRating,
  ]);

  // RESET PAGE WHEN FILTERS CHANGE
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    sortType,
    priceSort,
    selectedCategory,
    selectedBrands,
    selectedGenders,
    selectedResellers,
    minPrice,
    maxPrice,
    minimumRating,
  ]);

  // PAGINATION
  const totalPages = Math.max(
    1,
    Math.ceil(products.length / PRODUCTS_PER_PAGE),
  );

  const paginatedProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE,
  );

  // TOGGLE FILTER SELECTION
  const toggleSelection = (value, selected, setSelected) => {
    setSelected((previous) =>
      previous.includes(value)
        ? previous.filter((item) => item !== value)
        : [...previous, value],
    );
  };

  // FAVORITES
  const toggleFavorite = (product) => {
    const productId = product.id ?? product._id ?? product.name;

    setFavorites((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId],
    );
  };

  // CLEAR FILTERS
  const clearFilters = () => {
    setSelectedCategory("All Categories");
    setSelectedBrands([]);
    setSelectedGenders([]);
    setSelectedResellers([]);
    setMinPrice("");
    setMaxPrice("");
    setMinimumRating(0);
  };

  // FILTER SECTION HEADER
  const SectionHeader = ({ title, open, setOpen }) => (
    <button
      type="button"
      onClick={() => setOpen(!open)}
      className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold text-gray-800"
    >
      {title}
      {open ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
    </button>
  );

  // FILTER CHECKBOX
  const CheckOption = ({ label, checked, onChange }) => (
    <label className="flex cursor-pointer items-center gap-2 py-1.5 text-sm text-gray-600">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 accent-green-700"
      />
      <span>{label}</span>
    </label>
  );

  // FILTER SIDEBAR
  const FilterSidebar = ({ mobile = false }) => (
    <aside
      className={`rounded-xl bg-white ${mobile ? "w-full" : "sticky top-24"}`}
    >
      <div className="flex items-center justify-between border-b pb-3">
        <h2 className="font-semibold text-gray-900">Filters</h2>

        <button
          type="button"
          onClick={clearFilters}
          className="text-sm text-green-700 hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* CATEGORIES */}
      <div className="border-b">
        <SectionHeader
          title="Categories"
          open={categoryOpen}
          setOpen={setCategoryOpen}
        />

        {categoryOpen && (
          <div className="pb-3">
            <CheckOption
              label="All Categories"
              checked={selectedCategory === "All Categories"}
              onChange={() => setSelectedCategory("All Categories")}
            />

            {CATEGORIES.map((category) => (
              <CheckOption
                key={category}
                label={category}
                checked={selectedCategory === category}
                onChange={() =>
                  setSelectedCategory(
                    selectedCategory === category ? "All Categories" : category,
                  )
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* BRAND */}
      {brands.length > 0 && (
        <div className="border-b">
          <SectionHeader
            title="Brand"
            open={brandOpen}
            setOpen={setBrandOpen}
          />

          {brandOpen && (
            <div className="max-h-48 overflow-y-auto pb-3">
              {brands.map((brand) => (
                <CheckOption
                  key={brand}
                  label={brand}
                  checked={selectedBrands.includes(brand)}
                  onChange={() =>
                    toggleSelection(brand, selectedBrands, setSelectedBrands)
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* GENDER */}
      {genders.length > 0 && (
        <div className="border-b">
          <SectionHeader
            title="Gender"
            open={genderOpen}
            setOpen={setGenderOpen}
          />

          {genderOpen && (
            <div className="pb-3">
              {genders.map((gender) => (
                <CheckOption
                  key={gender}
                  label={gender}
                  checked={selectedGenders.includes(gender)}
                  onChange={() =>
                    toggleSelection(gender, selectedGenders, setSelectedGenders)
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* RESELLER */}
      {resellers.length > 0 && (
        <div className="border-b">
          <SectionHeader
            title="Reseller"
            open={resellerOpen}
            setOpen={setResellerOpen}
          />

          {resellerOpen && (
            <div className="pb-3">
              {resellers.map((reseller) => (
                <CheckOption
                  key={reseller}
                  label={reseller}
                  checked={selectedResellers.includes(reseller)}
                  onChange={() =>
                    toggleSelection(
                      reseller,
                      selectedResellers,
                      setSelectedResellers,
                    )
                  }
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* PRICE FILTER */}
      <div className="border-b">
        <SectionHeader title="Price" open={priceOpen} setOpen={setPriceOpen} />

        {priceOpen && (
          <div className="grid grid-cols-2 gap-2 pb-4">
            <input
              type="number"
              min="0"
              value={minPrice}
              onChange={(event) => setMinPrice(event.target.value)}
              placeholder="Min ₹"
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-700"
            />

            <input
              type="number"
              min="0"
              value={maxPrice}
              onChange={(event) => setMaxPrice(event.target.value)}
              placeholder="Max ₹"
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-green-700"
            />
          </div>
        )}
      </div>

      {/* RATING */}
      <div>
        <SectionHeader
          title="Rating"
          open={ratingOpen}
          setOpen={setRatingOpen}
        />

        {ratingOpen && (
          <div className="pb-4">
            {[4, 3, 2, 1].map((rating) => (
              <CheckOption
                key={rating}
                label={`${rating}★ & above`}
                checked={minimumRating === rating}
                onChange={() =>
                  setMinimumRating(minimumRating === rating ? 0 : rating)
                }
              />
            ))}
          </div>
        )}
      </div>

      {/* SIDEBAR ADVERTISEMENTS - HIDDEN DURING SEARCH */}
      {!isSearching && (
        <div className="mt-4 space-y-3">
          <div className="overflow-hidden rounded-[14px]">
            <img
              src="/images/ad/Herb-Shampoo.png"
              alt="Herbal Shampoo"
              className="block h-auto w-full object-cover"
            />
          </div>

          <div className="overflow-hidden rounded-[14px]">
            <img
              src="/images/ad/whey.png"
              alt="Whey Protein"
              className="block h-auto w-full object-cover"
            />
          </div>
        </div>
      )}
    </aside>
  );

  // PRODUCT CARD
  const renderProductCard = (product) => {
    const productId = product.id ?? product._id ?? product.name;

    return (
      <ProductCard
        key={productId}
        product={product}
        isFavorite={favorites.includes(productId)}
        onFavorite={() => toggleFavorite(product)}
        onAddToCart={(item, quantity) =>
          onAddToCart?.(item ?? product, quantity ?? 1)
        }
      />
    );
  };

  // MOBILE AND TABLET PRODUCT GRID
  const MobileTabletProducts = () => {
    const firstProducts = paginatedProducts.slice(0, 6);
    const remainingProducts = paginatedProducts.slice(6);

    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:hidden">
        {firstProducts.map(renderProductCard)}

        {/* NEEM ADVERTISEMENT - HIDDEN DURING SEARCH */}
        {!isSearching && firstProducts.length > 0 && (
          <div className="col-span-2 my-2 overflow-hidden rounded-[14px] sm:col-span-3 sm:my-3 sm:rounded-[16px]">
            <img
              src="/images/ad/Herb-Neem.png"
              alt="Natural Herbal Extract"
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {remainingProducts.map(renderProductCard)}
      </div>
    );
  };

  // DESKTOP PRODUCT GRID
  const DesktopProducts = () => {
    const firstProducts = paginatedProducts.slice(0, 9);
    const remainingProducts = paginatedProducts.slice(9);

    return (
      <div className="hidden grid-cols-3 gap-4 lg:grid xl:grid-cols-4 xl:gap-5">
        {firstProducts.map(renderProductCard)}

        {/* NEEM ADVERTISEMENT - HIDDEN DURING SEARCH */}
        {!isSearching && firstProducts.length > 0 && (
          <div className="col-span-3 my-2 overflow-hidden rounded-[14px] xl:col-span-4 xl:my-3 xl:rounded-[16px]">
            <img
              src="/images/ad/Herb-Neem.png"
              alt="Natural Herbal Extract"
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {remainingProducts.map(renderProductCard)}
      </div>
    );
  };

  return (
    <section className="mx-auto w-full max-w-[1600px] px-3 pb-12 sm:px-5 lg:px-8">
      {/* PAGE HEADING AND SORTING CONTROLS */}
      <div
        className="
        mb-5 flex flex-col items-start justify-between gap-4
        sm:flex-row sm:items-center
      "
      >
        {/* PAGE TITLE */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            {isSearching ? "Search Results" : "All Products"}
          </h1>

          {isSearching && (
            <p className="mt-1 text-sm text-gray-500">
              Results for "{searchQuery}"
            </p>
          )}

          <p className="mt-1 text-sm text-gray-500">
            {products.length} product
            {products.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* RESPONSIVE FILTER AND SORT CONTROLS */}
        <div
          className="
          flex w-full flex-col gap-3
          sm:w-auto sm:flex-row sm:items-center sm:gap-3
        "
        >
          {/* CUSTOMIZE SELECTION */}
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="
              flex w-full items-center justify-center gap-2
              rounded-lg border border-gray-300
              bg-white px-3 py-2.5 text-sm font-medium
              text-gray-700 transition hover:bg-gray-50
              sm:w-auto sm:py-2
              lg:hidden
            "
          >
            <SlidersHorizontal size={16} />
            Customize Selection
          </button>

          {/* SORTING OPTIONS */}
          <div
            className="
            grid w-full grid-cols-2 gap-2
            sm:w-auto sm:flex sm:items-center sm:gap-3
          "
          >
            {/* SORT BY */}
            <label
              className="
              flex min-w-0 flex-col gap-1
              text-xs text-gray-600
              sm:flex-row sm:items-center sm:gap-2 sm:text-sm
            "
            >
              <span className="font-medium">Sort by</span>

              <select
                value={sortType}
                onChange={(event) => setSortType(event.target.value)}
                className="
                  h-10 w-full min-w-0 rounded-lg
                  border border-gray-300 bg-white
                  px-2 text-xs text-gray-700
                  outline-none focus:border-green-700
                  sm:w-[145px] sm:px-3 sm:text-sm
                "
              >
                <option value="All">All Products</option>
                <option value="Recent">Recent</option>
                <option value="NewArrival">New Arrivals</option>
              </select>
            </label>

            {/* PRICE SORT */}
            <label
              className="
              flex min-w-0 flex-col gap-1
              text-xs text-gray-600
              sm:flex-row sm:items-center sm:gap-2 sm:text-sm
            "
            >
              <span className="font-medium">Price</span>

              <select
                value={priceSort}
                onChange={(event) => setPriceSort(event.target.value)}
                className="
                  h-10 w-full min-w-0 rounded-lg
                  border border-gray-300 bg-white
                  px-2 text-xs text-gray-700
                  outline-none focus:border-green-700
                  sm:w-[150px] sm:px-3 sm:text-sm
                "
              >
                <option value="default">Default Price</option>
                <option value="lowToHigh">Low to High</option>
                <option value="highToLow">High to Low</option>
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* MOBILE FILTER PANEL */}
      {showFilters && (
        <div className="mb-5 rounded-xl border p-4 lg:hidden">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-semibold">Customize Selection</span>

            <button
              type="button"
              onClick={() => setShowFilters(false)}
              aria-label="Close filters"
              className="rounded-full p-1 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          <FilterSidebar mobile />
        </div>
      )}

      {/* PRODUCTS AND DESKTOP SIDEBAR */}
      <div
        className="
        grid grid-cols-1 gap-6
        lg:grid-cols-[220px_minmax(0,1fr)]
        xl:grid-cols-[250px_minmax(0,1fr)]
      "
      >
        {/* DESKTOP FILTER SIDEBAR */}
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

        {/* PRODUCT SECTION */}
        <div className="min-w-0">
          {loading ? (
            <div className="py-16 text-center text-gray-500">
              Loading products...
            </div>
          ) : error ? (
            <div className="rounded-xl border border-dashed py-16 text-center">
              <p className="text-gray-600">{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-lg bg-green-800 px-5 py-2 text-sm font-medium text-white hover:bg-green-900"
              >
                Try again
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-xl border border-dashed py-16 text-center">
              <h2 className="text-lg font-semibold text-gray-800">
                No products found
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {isSearching
                  ? "Try searching with another product name."
                  : "Try changing your filters."}
              </p>

              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 rounded-lg bg-green-800 px-5 py-2 text-sm font-medium text-white hover:bg-green-900"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <MobileTabletProducts />
              <DesktopProducts />

              {/* PAGINATION */}
              {totalPages > 1 && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((page) => Math.max(1, page - 1))
                    }
                    className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 min-w-9 rounded-lg border px-3 text-sm ${
                        currentPage === page
                          ? "border-green-800 bg-green-800 text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((page) => Math.min(totalPages, page + 1))
                    }
                    className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default SeaallComponet;
