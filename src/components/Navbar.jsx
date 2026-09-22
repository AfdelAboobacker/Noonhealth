import {
  Search,
  ChevronDown,
  Heart,
  User,
  ShoppingCart,
} from "lucide-react";

const Navbar = () => {
  return (
    <nav className="absolute top-0 left-0 w-full h-[150px] z-50 bg-transparent flex items-center px-6 lg:px-10">

      {/* Logo */}
      <div className="flex items-center gap-4 shrink-0">
        <img
          src="/images/mainlogo/nh-logo-white.png"
          alt="Noon Herb"
          className="w-[85px] h-auto object-contain"
        />

        <span className="text-white text-3xl font-medium whitespace-nowrap">
          Noon Herb
        </span>
      </div>

      {/* Search */}
      <div className="flex h-[78px] flex-1 max-w-[890px] ml-16">

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

      {/* Right Side */}
      <div className="flex items-center gap-8 ml-14 text-white whitespace-nowrap">

        {/* Wishlist */}
        <button className="flex items-center gap-3 text-xl">
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
    </nav>
  );
};

export default Navbar;