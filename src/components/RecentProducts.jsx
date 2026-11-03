
import { useState, useEffect } from "react";
import ProductCarousel from "./ProductCarousel";
import { getRecentProducts } from "../api/productApi";

const RecentProducts = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecentProducts = async () => {
      try {
        const data = await getRecentProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching recent products:", error);
        setError("Unable to load recent products.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentProducts();
  }, []);

  if (loading) return <p>Loading recent products...</p>;

  if (error) return <p>{error}</p>;

  return (
    <ProductCarousel
      title="Best Seller"
      products={products}
      onAddToCart={onAddToCart}
    />
  );
};

export default RecentProducts;
