import { Link } from "react-router-dom";

import SignInNavbar from "../components/SignInNavbar";
import Footer from "../components/Footer";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* NAVBAR */}
      <SignInNavbar />

      {/* MAIN */}
      <main className="flex-1">
        <div
          className="
            w-full
            max-w-[1250px]
            mx-auto
            px-5
            sm:px-6
            md:px-8
            lg:px-10
            xl:px-14
            py-12
            sm:py-14
            md:py-16
            lg:py-20
            xl:py-24
          "
        >
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              items-center
              gap-8
              md:gap-10
              lg:gap-16
              xl:gap-24
            "
          >
            {/* IMAGE */}
            <div
              className="
                hidden
                md:flex
                justify-center
                items-center
                w-full
              "
            >
              <img
                src="/images/signin/Herb_leaf.png"
                alt="Noon Herb natural herbs"
                className="
                  w-full
                  max-w-[400px]
                  lg:max-w-[450px]
                  xl:max-w-[500px]
                  h-auto
                  object-contain
                "
              />
            </div>

            {/* FORGOT PASSWORD FORM */}
            <div
              className="
                w-full
                max-w-[390px]
                sm:max-w-[420px]
                md:max-w-[390px]
                lg:max-w-[400px]
                xl:max-w-[410px]
                mx-auto
                md:mx-0
              "
            >
              <h1
                className="
                  text-[#486400]
                  text-2xl
                  md:text-[24px]
                  font-bold
                  mb-4
                "
              >
                Forgot your password?
              </h1>

              <p
                className="
                  text-gray-600
                  text-sm
                  leading-5
                  mb-4
                  sm:mb-5
                "
              >
                Please enter the email address associated with
                your account and We will email you a link to
                reset your password.
              </p>

              {/* EMAIL INPUT */}
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-5">
                  <input
                    type="email"
                    placeholder="Enter your Email Address"
                    aria-label="Email address"
                    className="
                      w-full
                      h-[43px]
                      px-3
                      rounded-lg
                      border
                      border-gray-200
                      shadow-sm
                      outline-none
                      text-sm
                      text-gray-700
                      placeholder:text-gray-400
                      focus:border-[#9abb35]
                    "
                  />
                </div>

                {/* SIGN IN BUTTON */}
                <button
                  type="submit"
                  className="
                    w-full
                    h-[41px]
                    rounded-lg
                    bg-[#486400]
                    hover:bg-[#3d5500]
                    text-white
                    text-sm
                    font-medium
                    transition-colors
                  "
                >
                  Sign In
                </button>
              </form>

              {/* BACK BUTTON */}
              <Link
                to="/signin"
                className="
                  mt-5
                  w-full
                  h-[41px]
                  rounded-lg
                  border
                  border-[#486400]
                  text-[#486400]
                  hover:bg-gray-50
                  text-sm
                  font-medium
                  transition-colors
                  flex
                  items-center
                  justify-center
                "
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default ForgotPassword;