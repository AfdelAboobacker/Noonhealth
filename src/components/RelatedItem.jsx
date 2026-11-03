
import { useEffect, useState } from "react";
import ProductCarousel from "./ProductCarousel";
import { getRecentProducts } from "../api/productApi";

const RelatedItem = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getRecentProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="py-6 text-center">Loading related items...</p>;
  }

  return (
    <ProductCarousel
      title="Related Items"
      products={products}
      onAddToCart={onAddToCart}
    />
  );
};

export default RelatedItem;
