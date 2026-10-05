import { Link } from "react-router-dom";

const SignInNavbar = () => {
  return (
    <header
      className="w-full h-[115px] bg-cover bg-center flex items-center px-8 lg:px-10"
      style={{
        backgroundImage: "url('/images/navbg/navbg.png')",
      }}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <img
          src="/images/mainlogo/nh-logo-white.png"
          alt="Noon Herb"
          className="w-[58px] h-auto object-contain"
        />

        <span className="text-white text-2xl font-medium whitespace-nowrap">
          Noon Herb
        </span>
      </Link>

      {/* Right Side */}
      <div className="ml-auto text-white text-sm md:text-base">
        Already have an account?{" "}
        <Link
          to="/signin"
          className="font-medium hover:underline"
        >
          Sign in
        </Link>
      </div>
    </header>
  );
};

export default SignInNavbar;