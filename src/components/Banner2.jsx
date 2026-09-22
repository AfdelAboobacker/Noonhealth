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
    <section className="w-full py-10">
      {/* Same width/padding as ProductCarousel */}
      <div className="relative mx-auto w-full max-w-[1200px] px-10 sm:px-12 md:px-14">

        <div className="grid grid-cols-2 gap-5">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="group relative h-[280px] overflow-hidden"
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
              <div className="absolute bottom-5 left-0">
                <div className="bg-[#9abb35] px-4 py-2">
                  <h3 className="text-2xl font-bold text-white sm:text-3xl">
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