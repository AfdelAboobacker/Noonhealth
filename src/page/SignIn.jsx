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

    // Find matching user
    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password
    );

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    // Store logged-in user
    if (rememberMe) {
      localStorage.setItem(
        "noonHerbUser",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      );
    } else {
      sessionStorage.setItem(
        "noonHerbUser",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
        })
      );
    }

    setSuccess("Sign in successful!");

    // Go to home page
    setTimeout(() => {
      navigate("/");
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* NAVBAR */}
      <SignInNavbar />

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <div className="max-w-[1050px] mx-auto px-6 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10 md:gap-16">

            {/* LEFT - TEA IMAGE */}
            <div className="flex justify-center items-center">
              <img
                src="/images/signin/Tea_cup.png"
                alt="Noon Herb Tea"
                className="w-full max-w-[450px] object-contain"
              />
            </div>

            {/* RIGHT - SIGN IN FORM */}
            <div className="w-full max-w-[390px] mx-auto md:mx-0">
              <h1 className="text-[#486400] text-2xl md:text-[24px] font-bold mb-4">
                Sign in to Noon Herb
              </h1>

              <p className="text-gray-600 text-sm leading-5 mb-8">
                Welcome back to Noon Herb! Enter your email to get
                started.
              </p>

              <form onSubmit={handleSubmit}>
                {/* EMAIL */}
                <div className="mb-2">
                  <input
                    type="email"
                    placeholder="Enter your Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-[43px] px-3 rounded-lg border border-gray-200
                    shadow-sm outline-none text-sm text-gray-700
                    placeholder:text-gray-400
                    focus:border-[#9abb35]"
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full h-[43px] px-3 rounded-lg border border-gray-200
                    shadow-sm outline-none text-sm text-gray-700
                    placeholder:text-gray-400
                    focus:border-[#9abb35]"
                  />
                </div>

                {/* REMEMBER + FORGOT */}
                <div className="flex items-center justify-between text-xs text-gray-600 mb-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(e.target.checked)
                      }
                      className="w-5 h-5 rounded border-gray-300 accent-[#486400]"
                    />

                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() =>
                      alert("Please contact Noon Herb to reset your password.")
                    }
                    className="hover:text-[#486400]"
                  >
                    Forgot password?{" "}
                    <span className="text-[#486400] font-medium">
                      Reset It
                    </span>
                  </button>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="text-red-600 text-sm mb-3">
                    {error}
                  </div>
                )}

                {/* SUCCESS */}
                {success && (
                  <div className="text-green-700 text-sm mb-3">
                    {success}
                  </div>
                )}

                {/* SIGN IN BUTTON */}
                <button
                  type="submit"
                  className="w-full h-[41px] rounded-lg bg-[#486400]
                  hover:bg-[#3d5500] text-white text-sm font-medium
                  transition-colors"
                >
                  Sign In
                </button>
              </form>

              {/* SIGN UP */}
              <p className="text-gray-600 text-xs mt-5">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-[#486400] font-medium hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* EXISTING FOOTER */}
      <Footer />
    </div>
  );
};

export default SignIn;