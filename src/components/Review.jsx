import { useState } from "react";

const Review = () => {
  const [activeDot, setActiveDot] = useState(1);

  const reviews = [
    {
      id: 1,
      name: "Peter John",
      image: "/images/review/people/cus1.jpg",
      rating: "/images/review/star/4star.png",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 2,
      name: "Gladstone Abraham",
      image: "/images/review/people/cus2.jpg",
      rating: "/images/review/star/3andhalfstar.png",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
    {
      id: 3,
      name: "Christopher",
      image: "/images/review/people/cus3.jpg",
      rating: "/images/review/star/3star.png",
      review:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    },
  ];

  return (
    <section className="w-full bg-[#e4edc8] py-8 md:py-9">
      <div className="mx-auto w-full max-w-[1200px] px-10 sm:px-12 md:px-14">

        {/* Heading */}
        <h2 className="mb-8 text-center text-2xl font-bold text-[#666666] md:text-3xl">
          Customer Reviews
        </h2>

        {/* Reviews */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="flex flex-col">

              {/* Review Text */}
              <p className="text-[14px] font-medium leading-[20px] text-black">
                {review.review}
              </p>

              {/* Stars */}
              <div className="mt-3 h-[24px]">
                <img
                  src={review.rating}
                  alt="Customer rating"
                  className="h-full w-auto object-contain"
                />
              </div>

              {/* Customer */}
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={review.image}
                  alt={review.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <h3 className="text-[14px] font-bold text-[#666666]">
                  {review.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Review;