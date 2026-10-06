import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeItem = "Your Orders" }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    "Your Orders",
    "My Cart",
    "Settings",
    "Address",
    "Payment Method",
    "Notification",
    "Logout",
  ];

  const handleMenuClick = (item) => {
    setMenuOpen(false);

    if (item === "Your Orders") {
      navigate("/orders");
    }

    if (item === "My Cart") {
      navigate("/cart");
    }

    // Add other navigation later
  };

  return (
    <>
      {/* ========================================= */}
      {/* SMALL + MEDIUM */}
      {/* ========================================= */}

      <div className="lg:hidden w-full">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="
            w-full
            h-[52px]
            px-5
            rounded-[9px]
            bg-[#96B532]
            text-white
            text-[18px]
            sm:text-[20px]
            font-semibold
            flex
            items-center
            justify-between
            transition
            hover:bg-[#86A526]
          "
        >
          <span>{activeItem}</span>

          {menuOpen ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
        </button>

        {menuOpen && (
          <div
            className="
              mt-2
              w-full
              bg-white
              rounded-[9px]
              shadow-md
              border
              border-gray-100
              overflow-hidden
              relative
              z-30
            "
          >
            {menuItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleMenuClick(item)}
                className={`
                  w-full
                  min-h-[48px]
                  px-5
                  text-left
                  text-[17px]
                  sm:text-[18px]
                  font-medium
                  transition
                  ${
                    item === activeItem
                      ? "bg-[#96B532] text-white"
                      : "text-[#456600] hover:bg-[#f1f5df]"
                  }
                `}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ========================================= */}
      {/* LARGE SCREEN */}
      {/* ========================================= */}

      <aside className="hidden lg:block w-[255px] shrink-0">
        <div className="flex flex-col gap-[17px]">
          {menuItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleMenuClick(item)}
              className={`
                w-full
                h-[50px]
                rounded-[9px]
                text-[20px]
                font-semibold
                transition
                ${
                  item === activeItem
                    ? "bg-[#96B532] text-white"
                    : "bg-[#96B532] text-white hover:bg-[#86A526]"
                }
              `}
            >
              {item}
            </button>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;