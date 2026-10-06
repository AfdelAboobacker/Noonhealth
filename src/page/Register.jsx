import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import users from "../data/user";
import SignInNavbar from "../components/SignInNavbar";
import Footer from "../components/Footer";

export const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // REGISTER USER
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // ==========================================
    // CHECK PASSWORD
    // ==========================================

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // ==========================================
    // CHECK CONFIRM PASSWORD
    // ==========================================

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // ==========================================
    // GET EXISTING REGISTERED USERS
    // ==========================================

    const savedUsers = localStorage.getItem("noonHerbUsers");

    const registeredUsers = savedUsers
      ? JSON.parse(savedUsers)
      : [];

    // ==========================================
    // CHECK DEFAULT USER + REGISTERED USERS
    // ==========================================

    const allUsers = [...users, ...registeredUsers];

    const existingUser = allUsers.find(
      (item) =>
        item.email.toLowerCase() === cleanEmail
    );

    if (existingUser) {
      setError(
        "An account with this email already exists."
      );
      return;
    }

    // ==========================================
    // CREATE NEW USER
    // ==========================================

    const newUser = {
      id: Date.now(),
      name: cleanName,
      email: cleanEmail,
      password: password,
    };

    // ==========================================
    // SAVE USER
    // ==========================================

    const updatedUsers = [
      ...registeredUsers,
      newUser,
    ];

    localStorage.setItem(
      "noonHerbUsers",
      JSON.stringify(updatedUsers)
    );

    // ==========================================
    // SUCCESS
    // ==========================================

    setSuccess(
      "Account created successfully! Redirecting..."
    );

    // ==========================================
    // GO TO SIGN IN
    // ==========================================

    setTimeout(() => {
      navigate("/signin");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">

      {/* ================= NAVBAR ================= */}

      <SignInNavbar />

      {/* ================= MAIN ================= */}

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

            {/* ================= LEFT IMAGE ================= */}

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

            {/* ================= REGISTER FORM ================= */}

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

              {/* HEADING */}

              <h1
                className="
                  text-[#486400]
                  text-2xl
                  md:text-[24px]
                  font-bold
                  mb-4
                "
              >
                Create your Noon Herb account
              </h1>

              {/* DESCRIPTION */}

              <p
                className="
                  text-gray-600
                  text-sm
                  leading-5
                  mb-7
                  sm:mb-8
                "
              >
                Create an account to continue shopping with
                Noon Herb.
              </p>

              <form onSubmit={handleSubmit}>

                {/* ================= NAME ================= */}

                <div className="mb-3">

                  <input
                    type="text"
                    placeholder="Enter your Full Name"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
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

                {/* ================= EMAIL ================= */}

                <div className="mb-3">

                  <input
                    type="email"
                    placeholder="Enter your Email Address"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
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
                    placeholder="Create Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
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

                {/* ================= CONFIRM PASSWORD ================= */}

                <div className="mb-4">

                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
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

                {/* ================= SIGN UP BUTTON ================= */}

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
                  Sign Up
                </button>

              </form>

              {/* ================= SIGN IN ================= */}

              <p className="text-gray-600 text-xs mt-5">

                Already have an account?{" "}

                <Link
                  to="/signin"
                  className="
                    text-[#486400]
                    font-medium
                    hover:underline
                  "
                >
                  Sign In
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