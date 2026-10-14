import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeItem = "Your Orders", onLogout }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    "Your Orders",
    "Settings",
    "Address",
    "Payment Method",
    "Notification",
    "Logout",
  ];

  const handleMenuClick = (item) => {
    setMenuOpen(false);

    switch (item) {
      case "Your Orders":
        navigate("/orders");
        break;

      case "Settings":
        navigate("/settings");
        break;

      case "Address":
        navigate("/address");
        break;

      case "Payment Method":
        navigate("/payment-method");
        break;

      case "Notification":
        navigate("/notification");
        break;

      case "Logout":
        localStorage.removeItem("noonHerbUser");
        sessionStorage.removeItem("noonHerbUser");

        if (onLogout) {
          onLogout();
        } else {
          navigate("/signin");
        }
        break;

      default:
        break;
    }
  };

  const getButtonClass = (item) => `
    w-full min-h-[50px] px-3 rounded-[9px]
    text-[18px] sm:text-[20px] font-semibold
    transition-colors
    ${
      item === activeItem
        ? "bg-[#96B532] text-white"
        : "bg-[#96B532] text-white hover:bg-[#86A526]"
    }
  `;

  return (
    <>
      {/* Mobile and tablet sidebar dropdown */}
      <div className="relative w-full lg:hidden">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          className="flex min-h-[52px] w-full items-center justify-between rounded-[9px] bg-[#96B532] px-5 text-[18px] font-semibold text-white sm:text-[20px]"
        >
          <span>{activeItem}</span>
          {menuOpen ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <ChevronDown className="h-6 w-6" />
          )}
        </button>

        {menuOpen && (
          <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-[9px] border border-gray-100 bg-white shadow-md">
            {menuItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handleMenuClick(item)}
                className={`w-full min-h-[48px] px-5 text-left text-[17px] font-medium transition-colors sm:text-[18px] ${
                  item === activeItem
                    ? "bg-[#96B532] text-white"
                    : "text-[#456600] hover:bg-[#f1f5df]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden w-full shrink-0 lg:block lg:w-[255px]">
        <div className="flex flex-col gap-[17px]">
          {menuItems.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleMenuClick(item)}
              className={getButtonClass(item)}
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