import { Heart, ShoppingBag } from "lucide-react";

const ProductCard = ({
  product,
  isFavorite = false,
  onFavorite,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-[16px] bg-[#e5edc8] sm:rounded-[18px] lg:rounded-[20px]">
      {/* Product Image */}
      <div className="relative aspect-square w-full overflow-hidden bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />

        {/* Favorite */}
        <button
          type="button"
          onClick={() => onFavorite?.(product)}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className="absolute right-2 top-2 z-10 transition-transform duration-200 hover:scale-110 sm:right-3 sm:top-3 lg:right-4 lg:top-4"
        >
          <Heart
            size={22}
            strokeWidth={2}
            className={
              isFavorite ? "fill-red-500 text-red-500" : "text-red-500"
            }
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col px-2.5 pb-3 pt-2.5 sm:px-3 sm:pb-4 sm:pt-3">
        {/* Description */}
        <p
          className="
            h-[36px]
            overflow-hidden
            text-[11px]
            font-semibold
            leading-[18px]
            text-black
            line-clamp-2

            sm:h-[40px]
            sm:text-[13px]
            sm:leading-[20px]

            lg:h-[44px]
            lg:text-[14px]
            lg:leading-[22px]
          "
        >
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 sm:mt-2 sm:gap-x-3">
          <span className="text-[11px] font-bold text-black sm:text-[13px] lg:text-[14px]">
            {product.price} INR
          </span>

          <span className="text-[10px] font-semibold text-gray-500 line-through sm:text-[12px] lg:text-[13px]">
            {product.oldPrice} INR
          </span>

          <span className="text-[9px] font-bold text-red-500 sm:text-[11px]">
            {product.discount}% off
          </span>
        </div>

        {/* Add To Cart */}
        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className="
            mt-auto
            flex
            h-[34px]
            w-full
            items-center
            justify-center
            gap-1.5
            rounded-[8px]
            bg-[#4b6800]
            text-[11px]
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-[#3d5500]
            active:scale-[0.98]

            sm:h-[40px]
            sm:gap-2
            sm:rounded-[10px]
            sm:text-[14px]

            lg:h-[44px]
            lg:rounded-[11px]
            lg:text-[16px]
          "
        >
          <ShoppingBag
            size={17}
            strokeWidth={2}
            className="sm:size-[20px] lg:size-[23px]"
          />

          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
