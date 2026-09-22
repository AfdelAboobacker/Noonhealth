import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#9abb35] text-white">
      <div className="mx-auto w-full max-w-[1200px] px-10 py-8 sm:px-12 md:px-14">
        {/* Footer Columns */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 */}
          <div>
            <h3 className="mb-4 text-[16px] font-bold">Get to know us</h3>

            <ul className="space-y-1 text-[14px]">
              <li>
                <a href="#" className="hover:underline">
                  Company
                </a>
              </li>

              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>

              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>

              <li>
                <a href="#" className="hover:underline">
                  Help Center
                </a>
              </li>

              <li>
                <a href="#" className="hover:underline">
                  Our Value
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="mb-4 text-[16px] font-bold">For Consumers</h3>

            <ul className="space-y-1 text-[14px]">
              <li>
                <a href="#" className="hover:underline">
                  Payments
                </a>
              </li>

              <li>
                <a href="#" className="hover:underline">
                  Shipping
                </a>
              </li>

              <li>
                <a href="#" className="hover:underline">
                  Product Returns
                </a>
              </li>

              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>

              <li>
                <a href="#" className="hover:underline">
                  Shop Checkout
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="mb-4 text-[16px] font-bold">Become a Shopper</h3>

            <ul className="space-y-1 text-[14px]">
              <li>
                <a href="#" className="hover:underline">
                  Shopper Opportunities
                </a>
              </li>

              <li>
                <a href="#" className="hover:underline">
                  Become a Shopper
                </a>
              </li>

              <li>
                <a href="#" className="hover:underline">
                  Earnings
                </a>
              </li>

              <li>
                <a href="#" className="hover:underline">
                  Ideas & Guides
                </a>
              </li>

              <li>
                <a href="#" className="hover:underline">
                  New Retailers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="mb-3 text-[16px] font-bold">Follow us on</h3>

            {/* Social Icons */}
            <div className="mb-4 flex items-center gap-4">
              <a
                href="#"
                aria-label="Facebook"
                className="transition-transform hover:scale-110"
              >
                <FaFacebookF size={26} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="transition-transform hover:scale-110"
              >
                <FaInstagram size={27} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="transition-transform hover:scale-110"
              >
                <FaTwitter size={28} />
              </a>
            </div>

            {/* Newsletter */}
            <h3 className="mb-4 text-[16px] font-bold">
              Subscribe to Newsletter
            </h3>

            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="h-[38px] w-full rounded-[7px] bg-white px-3 text-[10px] text-black outline-none placeholder:text-gray-500"
              />

              <button
                type="button"
                className="ml-auto h-[38px] w-[108px] rounded-[7px] bg-[#486400] text-[14px] font-semibold text-white transition-colors hover:bg-[#3b5300]"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="text-[16px] font-medium">Copyrights @ Noon Herb 2023</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
