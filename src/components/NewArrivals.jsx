import ProductCarousel from "./ProductCarousel";
import newArrivals from "../data/newarrival";

const NewArrivals = ({ onAddToCart }) => {
  return (
    <ProductCarousel
      title="New Arrivals"
      products={newArrivals}
      onAddToCart={onAddToCart}
    />
  );
};

export default NewArrivals;