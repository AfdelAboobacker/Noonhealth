import {
  Search,
  ChevronDown,
  Heart,
  User,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`
        fixed
        top-0
        left-0
        w-full
        z-50
        transition-all
        duration-300

        ${
          scrolled ? "bg-black/40 backdrop-blur-md shadow-lg" : "bg-transparent"
        }
      `}
    >
      {/* Main Navbar */}
      <div className="h-[75px] lg:h-[90px] flex items-center px-5 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2 lg:gap-3 shrink-0">
          <img
            src="/images/mainlogo/nh-logo-white.png"
            alt="Noon Herb"
            className="w-[50px] lg:w-[65px] h-auto object-contain"
          />

          <span className="text-white text-xl lg:text-2xl font-medium whitespace-nowrap">
            Noon Herb
          </span>
        </div>
        {/* Search - Desktop only */}
        <div className="hidden lg:flex h-[55px] flex-1 max-w-[890px] ml-10">
          {/* Search Input */}
          <div className="flex items-center bg-white rounded-l-2xl flex-1 px-7">
            <Search className="w-9 h-9 text-gray-500 mr-4" />

            <input
              type="text"
              placeholder="Search for products"
              className="w-full outline-none text-2xl text-gray-700 placeholder:text-gray-500"
            />
          </div>

          {/* Category */}
          <button className="bg-lime-500 hover:bg-lime-600 text-white px-6 rounded-r-2xl flex items-center gap-3 text-xl whitespace-nowrap">
            All Categories
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        {/* Right Side - Desktop only */}
        <div className="hidden lg:flex items-center gap-8 ml-14 text-white whitespace-nowrap">
          {/* Wishlist */}
          <button className="flex items-center gap-3 text-xl hover:text-lime-500 transition-colors duration-300">
            <Heart className="w-9 h-9" />
            <span>Wish List</span>
          </button>

          {/* Account */}
          <button className="flex items-center gap-3 text-xl">
            <User className="w-9 h-9" />
            <span>My Account</span>
          </button>

          {/* Cart */}
          <button className="flex items-center gap-3 text-xl">
            <ShoppingCart className="w-9 h-9" />
            <span>My Cart</span>
          </button>
        </div>

        {/* Toggle Button - Small & Medium */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden ml-auto text-white"
        >
          {menuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile / Tablet Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white mx-4 rounded-xl shadow-lg p-5">
          {/* Search */}
          <div className="flex items-center border rounded-lg px-4 py-3 mb-4">
            <Search className="w-6 h-6 text-gray-500 mr-3" />

            <input
              type="text"
              placeholder="Search for products"
              className="w-full outline-none text-lg"
            />
          </div>

          {/* Menu Items */}
          <div className="flex flex-col gap-4 text-gray-700">
            <button className="flex items-center gap-3 text-lg">
              <Heart className="w-6 h-6" />
              Wish List
            </button>

            <button className="flex items-center gap-3 text-lg">
              <User className="w-6 h-6" />
              My Account
            </button>

            <button className="flex items-center gap-3 text-lg">
              <ShoppingCart className="w-6 h-6" />
              My Cart
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
