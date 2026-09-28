import ProductCarousel from "./ProductCarousel";
import recentProducts from "../data/recent";

const RelatedItem = ({ onAddToCart }) => {
  return (
    <ProductCarousel
      title="Related Items"
      products={recentProducts}
      onAddToCart={onAddToCart}
    />
  );
};

export default RelatedItem;