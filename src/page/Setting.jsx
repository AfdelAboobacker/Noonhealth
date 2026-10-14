
import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

// ==========================================
// GET CURRENT LOGGED-IN USER
// ==========================================

const getCurrentUser = () => {
  const savedUser =
    localStorage.getItem("noonHerbUser") ||
    sessionStorage.getItem("noonHerbUser");

  if (!savedUser) {
    return null;
  }

  try {
    const parsedUser = JSON.parse(savedUser);

    // Supports a user object or an object containing a user.
    if (parsedUser && typeof parsedUser === "object") {
      return parsedUser.user || parsedUser;
    }

    // Supports an email stored directly as a string.
    if (typeof parsedUser === "string") {
      return { email: parsedUser };
    }
  } catch {
    // If the stored value is a plain email address.
    if (savedUser.includes("@")) {
      return { email: savedUser };
    }
  }

  return null;
};

const Setting = ({ onLogout }) => {
  const currentUser = getCurrentUser();

  // ==========================================
  // ACCOUNT DETAILS
  // ==========================================

  const [account, setAccount] = useState(() => {
    const savedAccount = localStorage.getItem("noonHerbAccount");

    let accountDetails = {};

    try {
      accountDetails = savedAccount
        ? JSON.parse(savedAccount)
        : {};
    } catch {
      accountDetails = {};
    }

    return {
      firstName: accountDetails.firstName || "",
      lastName: accountDetails.lastName || "",
      phone: accountDetails.phone || "",
    };
  });

  // ==========================================
  // PASSWORD DETAILS
  // ==========================================

  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [accountMessage, setAccountMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // ==========================================
  // INPUT STYLES
  // ==========================================

  const inputClass = `
    w-full h-[58px] px-5
    rounded-[13px] border border-gray-200
    bg-white text-[17px] text-[#555555]
    placeholder:text-[#707070]
    shadow-sm outline-none
    focus:border-[#96B532]
    focus:ring-1 focus:ring-[#96B532]
  `;

  const buttonClass = `
    w-full sm:w-[310px] h-[61px]
    rounded-[12px] bg-[#405900]
    text-white text-[16px] font-semibold
    transition-colors hover:bg-[#344900]
  `;

  // ==========================================
  // HANDLE ACCOUNT INPUTS
  // ==========================================

  const handleAccountChange = (e) => {
    const { name, value } = e.target;

    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));

    setAccountMessage("");
  };

  // ==========================================
  // SAVE ACCOUNT DETAILS
  // ==========================================

  const handleAccountSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "noonHerbAccount",
      JSON.stringify(account)
    );

    // Update the registered user's name as well.
    const email = currentUser?.email?.trim().toLowerCase();

    if (email) {
      try {
        const savedUsers = JSON.parse(
          localStorage.getItem("noonHerbUsers") || "[]"
        );

        const updatedUsers = savedUsers.map((user) =>
          user.email?.toLowerCase() === email
            ? {
                ...user,
                name: `${account.firstName.trim()} ${account.lastName.trim()}`.trim(),
                phone: account.phone,
              }
            : user
        );

        localStorage.setItem(
          "noonHerbUsers",
          JSON.stringify(updatedUsers)
        );
      } catch (error) {
        console.error("Failed to update account details:", error);
      }
    }

    setAccountMessage("Account details saved successfully.");
  };

  // ==========================================
  // HANDLE PASSWORD INPUTS
  // ==========================================

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPasswordMessage("");
    setPasswordError(false);
  };

  // ==========================================
  // UPDATE ACTUAL REGISTERED PASSWORD
  // ==========================================

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    setPasswordMessage("");
    setPasswordError(false);

    const newPassword = password.newPassword;
    const confirmPassword = password.confirmPassword;

    // Validate password length using Register.jsx rules.
    if (newPassword.length < 6) {
      setPasswordError(true);
      setPasswordMessage(
        "Password must be at least 6 characters."
      );
      return;
    }

    // Confirm both passwords match.
    if (newPassword !== confirmPassword) {
      setPasswordError(true);
      setPasswordMessage("Passwords do not match.");
      return;
    }

    // Identify the current user.
    const email = currentUser?.email?.trim().toLowerCase();

    if (!email) {
      setPasswordError(true);
      setPasswordMessage(
        "Unable to identify your account. Please sign in again."
      );
      return;
    }

    try {
      // Read the users created by Register.jsx.
      const registeredUsers = JSON.parse(
        localStorage.getItem("noonHerbUsers") || "[]"
      );

      if (!Array.isArray(registeredUsers)) {
        throw new Error("Invalid registered users data.");
      }

      // Find the currently logged-in registered user.
      const userIndex = registeredUsers.findIndex(
        (user) => user.email?.trim().toLowerCase() === email
      );

      if (userIndex === -1) {
        setPasswordError(true);
        setPasswordMessage(
          "Your registered account was not found. Please check your sign-in setup."
        );
        return;
      }

      // Update only the current user's password.
      const updatedUsers = registeredUsers.map((user, index) =>
        index === userIndex
          ? {
              ...user,
              password: newPassword,
            }
          : user
      );

      // Save the updated users array.
      localStorage.setItem(
        "noonHerbUsers",
        JSON.stringify(updatedUsers)
      );

      setPasswordMessage(
        "Password updated successfully. You can use your new password next time you sign in."
      );

      setPassword({
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Failed to update password:", error);

      setPasswordError(true);
      setPasswordMessage(
        "Unable to update your password. Please try again."
      );
    }
  };

  // ==========================================
  // PAGE UI
  // ==========================================

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* NAVBAR BACKGROUND */}

      <div
        className="
          absolute left-0 top-0 z-0
          h-[75px] w-full
          bg-cover bg-center bg-no-repeat
          lg:h-[90px]
        "
        style={{
          backgroundImage: "url('/images/navbg/navbg.png')",
        }}
      />

      {/* NAVBAR */}

      <Navbar />

      {/* SETTINGS CONTENT */}

      <main
        className="
          flex-1 w-full max-w-[1450px] mx-auto
          px-4 sm:px-8 lg:px-10
          pt-[105px] sm:pt-[110px] lg:pt-[130px]
          pb-16
        "
      >
        <div className="
          flex flex-col lg:flex-row
          items-start gap-5 lg:gap-[21px]
        ">

          {/* SIDEBAR */}

          <div className="w-full lg:w-[310px] shrink-0">
            <Sidebar
              activeItem="Settings"
              onLogout={onLogout}
            />
          </div>

          {/* SETTINGS */}

          <div className="w-full min-w-0 flex-1">

            <h1 className="
              text-[25px] sm:text-[27px]
              font-semibold text-[#405900] mb-8
            ">
              Account Settings
            </h1>

            {/* ACCOUNT DETAILS */}

            <section>
              <h2 className="
                text-[20px] sm:text-[22px]
                font-medium text-[#405900] mb-5
              ">
                Account details
              </h2>

              <form onSubmit={handleAccountSubmit}>

                <div className="
                  grid grid-cols-1 sm:grid-cols-2
                  gap-4 max-w-[530px] mb-[18px]
                ">
                  <input
                    type="text"
                    name="firstName"
                    value={account.firstName}
                    onChange={handleAccountChange}
                    placeholder="First Name"
                    aria-label="First Name"
                    autoComplete="given-name"
                    className={inputClass}
                    required
                  />

                  <input
                    type="text"
                    name="lastName"
                    value={account.lastName}
                    onChange={handleAccountChange}
                    placeholder="Last Name"
                    aria-label="Last Name"
                    autoComplete="family-name"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="max-w-[530px] mb-[27px]">
                  <input
                    type="tel"
                    name="phone"
                    value={account.phone}
                    onChange={handleAccountChange}
                    placeholder="Phone No"
                    aria-label="Phone Number"
                    autoComplete="tel"
                    className={inputClass}
                    required
                  />
                </div>

                <button type="submit" className={buttonClass}>
                  Save Changes
                </button>

                {accountMessage && (
                  <p role="status" className="mt-3 text-sm text-[#405900]">
                    {accountMessage}
                  </p>
                )}
              </form>
            </section>

            {/* DIVIDER */}

            <hr className="border-0 border-t border-gray-500 my-[30px]" />

            {/* PASSWORD */}

            <section>
              <h2 className="
                text-[20px] sm:text-[22px]
                font-medium text-[#405900] mb-5
              ">
                Password
              </h2>

              <form onSubmit={handlePasswordSubmit}>

                <div className="
                  grid grid-cols-1 md:grid-cols-2
                  gap-4 mb-[19px]
                ">
                  <input
                    type="password"
                    name="newPassword"
                    value={password.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="New Password"
                    aria-label="New Password"
                    autoComplete="new-password"
                    className={inputClass}
                    minLength={6}
                    required
                  />

                  <input
                    type="password"
                    name="confirmPassword"
                    value={password.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="Confirm Password"
                    aria-label="Confirm Password"
                    autoComplete="new-password"
                    className={inputClass}
                    minLength={6}
                    required
                  />
                </div>

                <button type="submit" className={buttonClass}>
                  Save Changes
                </button>

                {passwordMessage && (
                  <p
                    role="status"
                    className={`mt-3 text-sm ${
                      passwordError
                        ? "text-red-600"
                        : "text-[#405900]"
                    }`}
                  >
                    {passwordMessage}
                  </p>
                )}
              </form>
            </section>

          </div>
        </div>
      </main>

      {/* FOOTER */}

      <Footer />
    </div>
  );
};

export default Setting;
