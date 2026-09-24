const Banner2 = () => {
  const banners = [
    {
      id: 1,
      image: "/images/banner2/banner1.png",
      title: "COVID Essentials",
    },
    {
      id: 2,
      image: "/images/banner2/banner3.png",
      title: "Immunity",
    },
    {
      id: 3,
      image: "/images/banner2/banner2.png",
      title: "Diet & Nutrition",
    },
    {
      id: 4,
      image: "/images/banner2/banner4.png",
      title: "Protein Supplements",
    },
  ];

  return (
    <section className="w-full py-6 sm:py-8 lg:py-10">
      {/* Same width/padding as ProductCarousel */}
      <div className="relative mx-auto w-full max-w-[1200px] px-4 sm:px-8 md:px-10 lg:px-14">

        {/* Banners */}
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="
                group
                relative
                h-[180px]
                overflow-hidden
                rounded-[12px]

                sm:h-[220px]
                sm:rounded-[14px]

                md:h-[240px]

                lg:h-[280px]
                lg:rounded-none
              "
            >
              {/* Image */}
              <img
                src={banner.image}
                alt={banner.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Green Overlay */}
              <div className="absolute inset-0 bg-[#7da52a]/55" />

              {/* Title */}
              <div className="absolute bottom-3 left-0 sm:bottom-4 lg:bottom-5">
                <div className="bg-[#9abb35] px-3 py-1.5 sm:px-4 sm:py-2">
                  <h3 className="text-lg font-bold text-white sm:text-2xl lg:text-3xl">
                    {banner.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Banner2;