import {
  Search,
  ChevronDown,
  Heart,
  User,
  ShoppingCart,
  Menu,
  X,
  Package,
} from "lucide-react";

import { useState, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import newArrivals from "../data/newarrival";
import recentProducts from "../data/recent";

const Navbar = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // All products used by the See All page
  const allProducts = useMemo(() => [...recentProducts, ...newArrivals], []);

  // Sync search when the URL changes
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setShowSuggestions(false);
  }, [searchParams]);

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Find suggestions using product names only
  const suggestions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return [];

    const seen = new Set();

    return allProducts
      .filter((product) => {
        const name = String(product.name || "").trim();

        if (!name || !name.toLowerCase().includes(query)) {
          return false;
        }

        // Avoid duplicate product names
        const key = name.toLowerCase();

        if (seen.has(key)) return false;

        seen.add(key);
        return true;
      })
      .slice(0, 6);
  }, [allProducts, search]);

  // Search results page
  const handleSearch = (value = search) => {
    const query = value.trim();

    if (!query) return;

    setSearch(query);
    setShowSuggestions(false);
    setMenuOpen(false);

    navigate(`/seeall?search=${encodeURIComponent(query)}`);
  };

  // Shared desktop/mobile search UI
  const renderSearch = (mobile = false) => (
    <div className="relative min-w-0 flex-1">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
        className={`flex items-center ${
          mobile
            ? "rounded-lg border border-gray-200 px-3 py-3"
            : "rounded-l-2xl bg-white px-4"
        }`}
      >
        <Search
          className={`shrink-0 text-gray-500 ${
            mobile ? "mr-2 h-5 w-5" : "mr-3 h-6 w-6"
          }`}
        />

        <input
          type="search"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              setShowSuggestions(false);
            }
          }}
          placeholder="Search for products"
          autoComplete="off"
          className={`w-full min-w-0 bg-transparent text-gray-800 outline-none ${
            mobile ? "text-base" : "text-lg"
          }`}
        />

        {search && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              setSearch("");
              setShowSuggestions(false);
            }}
            className="ml-2 text-gray-400 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </form>

      {/* Live product-name suggestions */}
      {showSuggestions && search.trim() && (
        <div className="absolute left-0 right-0 top-full z-[70] mt-2 max-h-80 overflow-y-auto rounded-xl border border-gray-100 bg-white py-2 text-gray-800 shadow-xl">
          {suggestions.length > 0 ? (
            <>
              {suggestions.map((product, index) => (
                <button
                  key={`${product.id ?? product.name}-${index}`}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => handleSearch(product.name)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left hover:bg-lime-50"
                >
                  <Search className="h-4 w-4 shrink-0 text-gray-400" />

                  <span className="text-sm">{product.name}</span>
                </button>
              ))}

              <button
                type="button"
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => handleSearch()}
                className="w-full border-t px-4 py-3 text-left text-sm font-semibold text-lime-700 hover:bg-gray-50"
              >
                See all results for "{search.trim()}"
              </button>
            </>
          ) : (
            <p className="px-4 py-3 text-sm text-gray-500">
              No products found.
            </p>
          )}
        </div>
      )}
    </div>
  );

  return (
    <nav
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-black/40 shadow-lg backdrop-blur-md" : "bg-transparent"
      }`}
    >
      {/* Main navbar */}
      <div className="flex h-[75px] items-center gap-4 px-4 lg:h-[90px] lg:px-8">
        {/* Logo */}
        <button
          type="button"
          onClick={() => {
            setShowSuggestions(false);
            navigate("/");
          }}
          className="flex shrink-0 items-center gap-2"
        >
          <img
            src="/images/mainlogo/nh-logo-white.png"
            alt="Noon Herb"
            className="h-auto w-[45px] object-contain lg:w-[60px]"
          />

          <span className="whitespace-nowrap text-lg font-medium text-white lg:text-2xl">
            Noon Herb
          </span>
        </button>

        {/* Desktop search */}
        <div className="ml-4 hidden max-w-[850px] flex-1 lg:flex">
          {renderSearch()}

          <button
            type="button"
            onClick={() => handleSearch()}
            className="flex items-center gap-2 whitespace-nowrap rounded-r-2xl bg-lime-500 px-4 text-white transition hover:bg-lime-600"
          >
            All Categories
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>

        {/* Desktop actions */}
        <div className="ml-auto hidden items-center gap-5 whitespace-nowrap text-white lg:flex">
          <button
            type="button"
            className="flex items-center gap-2 transition hover:text-lime-400"
          >
            <Heart className="h-6 w-6" />
            Wish List
          </button>

          <button
            type="button"
            onClick={() => navigate("/settings")}
            className="flex items-center gap-2 transition hover:text-lime-400"
          >
            <User className="h-5 w-5" />
            My Account
          </button>

          <button
            type="button"
            onClick={() => navigate("/orders")}
            className="flex items-center gap-2 transition hover:text-lime-400"
          >
            <Package className="h-6 w-6" />
            Our Orders
          </button>

          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 transition hover:text-lime-400"
          >
            <ShoppingCart className="h-6 w-6" />
            My Cart
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="ml-auto text-white lg:hidden"
        >
          {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>

      {/* Mobile and tablet menu */}
      {menuOpen && (
        <div className="mx-3 rounded-xl bg-white p-4 shadow-xl lg:hidden">
          {renderSearch(true)}

          <div className="mt-5 flex flex-col gap-4 text-gray-700">
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-left"
            >
              <Heart className="h-5 w-5" />
              Wish List
            </button>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                navigate("/settings");
              }}
              className="flex items-center gap-3 text-left"
            >
              <User className="h-5 w-5" />
              My Account
            </button>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                navigate("/orders");
              }}
              className="flex items-center gap-3 text-left"
            >
              <Package className="h-5 w-5" />
              Our Orders
            </button>

            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                navigate("/cart");
              }}
              className="flex items-center gap-3 text-left"
            >
              <ShoppingCart className="h-5 w-5" />
              My Cart
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
