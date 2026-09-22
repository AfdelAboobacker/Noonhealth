import ProductCarousel from "./ProductCarousel";
import recentProducts from "../data/recent";

const RecentProducts = () => {
  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  return (
    <ProductCarousel
      title="Best Seller"
      products={recentProducts}
      onAddToCart={handleAddToCart}
    />
  );
};

export default RecentProducts;