import { Link } from "react-router-dom";

const SignInNavbar = () => {
  return (
    <header
      className="
        w-full
        min-h-[85px]
        sm:min-h-[95px]
        md:h-[105px]
        lg:h-[115px]
        xl:h-[120px]
        bg-cover
        bg-center
        flex
        items-center
        px-4
        sm:px-6
        md:px-8
        lg:px-10
        xl:px-14
      "
      style={{
        backgroundImage: "url('/images/navbg/navbg.png')",
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        className="
          flex
          items-center
          gap-2
          sm:gap-3
          md:gap-3
          lg:gap-3
          shrink-0
        "
      >
        <img
          src="/images/mainlogo/nh-logo-white.png"
          alt="Noon Herb"
          className="
            w-[45px]
            sm:w-[50px]
            md:w-[55px]
            lg:w-[58px]
            xl:w-[62px]
            h-auto
            object-contain
          "
        />

        <span
          className="
            text-white
            text-lg
            sm:text-xl
            md:text-xl
            lg:text-2xl
            xl:text-2xl
            font-medium
            whitespace-nowrap
          "
        >
          Noon Herb
        </span>
      </Link>

      {/* Right Side */}
      <div
        className="
          ml-auto
          text-white
          text-xs
          sm:text-sm
          md:text-sm
          lg:text-base
          xl:text-base
          text-right
        "
      >
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