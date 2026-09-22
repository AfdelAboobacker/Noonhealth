import ProductCarousel from "./ProductCarousel";
import newArrivals from "../data/newarrival";

const NewArrivals = () => {
  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  return (
    <ProductCarousel
      title="New Arrivals"
      products={newArrivals}
      onAddToCart={handleAddToCart}
    />
  );
};

export default NewArrivals;