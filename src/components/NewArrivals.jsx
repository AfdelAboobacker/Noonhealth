
import { useState, useEffect } from "react";
import ProductCarousel from "./ProductCarousel";
import { getNewArrivals } from "../api/productApi";

const NewArrivals = ({ onAddToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const data = await getNewArrivals();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
        setError("Unable to load new arrivals.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewArrivals();
  }, []);

  if (loading) return <p>Loading new arrivals...</p>;

  if (error) return <p>{error}</p>;

  return (
    <ProductCarousel
      title="New Arrivals"
      products={products}
      onAddToCart={onAddToCart}
    />
  );
};

export default NewArrivals;
