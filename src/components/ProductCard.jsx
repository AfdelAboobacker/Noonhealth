import { Heart, ShoppingBag } from "lucide-react";

const ProductCard = ({
  product,
  isFavorite = false,
  onFavorite,
  onAddToCart,
}) => {
  if (!product) return null;

  return (
    <div className="w-full overflow-hidden rounded-[20px] bg-[#e5edc8]">
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
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          className="absolute right-4 top-4 z-10 transition-transform duration-200 hover:scale-110"
        >
          <Heart
            size={30}
            strokeWidth={2}
            className={
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-red-500"
            }
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="px-3 pb-4 pt-3">
        {/* Description */}
        <p className="min-h-[48px] text-[14px] font-semibold leading-[20px] text-black">
          {product.description}
        </p>

        {/* Price */}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-[14px] font-bold text-black">
            {product.price} INR
          </span>

          <span className="text-[13px] font-semibold text-gray-500 line-through">
            {product.oldPrice} INR
          </span>

          <span className="text-[11px] font-bold text-red-500">
            {product.discount}% off
          </span>
        </div>

        {/* Add To Cart */}
        <button
          type="button"
          onClick={() => onAddToCart?.(product)}
          className="mt-4 flex h-[44px] w-full items-center justify-center gap-2 rounded-[11px] bg-[#4b6800] text-[16px] font-semibold text-white transition-all duration-200 hover:bg-[#3d5500] active:scale-[0.98]"
        >
          <ShoppingBag size={23} strokeWidth={2} />

          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;