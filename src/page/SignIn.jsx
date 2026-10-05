import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import users from "../data/user";
import SignInNavbar from "../components/SignInNavbar";
import Footer from "../components/Footer";

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    const loggedInUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    if (rememberMe) {
      localStorage.setItem(
        "noonHerbUser",
        JSON.stringify(loggedInUser)
      );
    } else {
      sessionStorage.setItem(
        "noonHerbUser",
        JSON.stringify(loggedInUser)
      );
    }

    setSuccess("Sign in successful!");

    setTimeout(() => {
      navigate("/");
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ================= NAVBAR ================= */}
      <SignInNavbar />

      {/* ================= MAIN CONTENT ================= */}
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

            {/* ================= LEFT - TEA IMAGE ================= */}
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
                src="/images/signin/Tea_cup.png"
                alt="Noon Herb Tea"
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

            {/* ================= RIGHT - SIGN IN FORM ================= */}
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

              {/* Heading */}
              <h1
                className="
                  text-[#486400]
                  text-2xl
                  md:text-[24px]
                  font-bold
                  mb-4
                "
              >
                Sign in to Noon Herb
              </h1>

              {/* Description */}
              <p
                className="
                  text-gray-600
                  text-sm
                  leading-5
                  mb-7
                  sm:mb-8
                "
              >
                Welcome back to Noon Herb! Enter your email to get
                started.
              </p>

              <form onSubmit={handleSubmit}>

                {/* ================= EMAIL ================= */}
                <div className="mb-2">
                  <input
                    type="email"
                    placeholder="Enter your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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

                {/* ================= PASSWORD ================= */}
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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

                {/* ================= REMEMBER + FORGOT ================= */}
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                    text-xs
                    text-gray-600
                    mb-5
                  "
                >
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(e.target.checked)
                      }
                      className="
                        w-5
                        h-5
                        rounded
                        border-gray-300
                        accent-[#486400]
                        shrink-0
                      "
                    />

                    <span className="whitespace-nowrap">
                      Remember me
                    </span>
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      alert(
                        "Please contact Noon Herb to reset your password."
                      )
                    }
                    className="
                      hover:text-[#486400]
                      text-right
                    "
                  >
                    Forgot password?{" "}
                    <span className="text-[#486400] font-medium">
                      Reset It
                    </span>
                  </button>
                </div>

                {/* ================= ERROR ================= */}
                {error && (
                  <div className="text-red-600 text-sm mb-3">
                    {error}
                  </div>
                )}

                {/* ================= SUCCESS ================= */}
                {success && (
                  <div className="text-green-700 text-sm mb-3">
                    {success}
                  </div>
                )}

                {/* ================= SIGN IN BUTTON ================= */}
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

              {/* ================= SIGN UP ================= */}
              <p className="text-gray-600 text-xs mt-5">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="
                    text-[#486400]
                    font-medium
                    hover:underline
                  "
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <Footer />
    </div>
  );
};

export default SignIn;