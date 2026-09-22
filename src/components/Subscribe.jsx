import { useState } from "react";

const Subscribe = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    console.log("Subscribed:", email);

    setEmail("");
  };

  return (
    <section className="w-full bg-white py-7">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between gap-6 px-10 sm:px-12 md:flex-row md:px-14">

        {/* Left Content */}
        <div className="w-full md:w-[42%]">
          <h2 className="text-2xl font-bold leading-tight text-[#486400]">
            Subscribe to Newsletter
          </h2>

          <p className="mt-1 text-[12px] font-medium leading-[20px] text-black">
            Don't miss out on seasonal health tips, new blogs,
            <br className="hidden sm:block" />
            product launches and many more!
          </p>
        </div>

        {/* Subscribe Form */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center gap-3 md:w-[55%]"
        >
          {/* Email */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Your Email Address"
            required
            className="h-[40px] min-w-0 flex-1 rounded-[7px] border border-gray-200 bg-white px-3 text-[11px] text-black shadow-[0_1px_7px_rgba(0,0,0,0.2)] outline-none placeholder:text-gray-500 focus:shadow-[0_1px_8px_rgba(72,100,0,0.3)]"
          />

          {/* Subscribe */}
          <button
            type="submit"
            className="h-[40px] w-[120px] flex-shrink-0 rounded-[7px] bg-[#486400] text-[14px] font-bold text-white transition-colors duration-200 hover:bg-[#3d5500] active:scale-[0.98]"
          >
            Subscribe
          </button>
        </form>

      </div>
    </section>
  );
};

export default Subscribe;