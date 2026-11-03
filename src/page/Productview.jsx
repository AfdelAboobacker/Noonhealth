
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductViewComponent from "../components/ProductViewComponent";
import RelatedItem from "../components/RelatedItem";

import { getProductById } from "../api/productApi";

export const Productview = ({ onAddToCart }) => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="min-h-screen bg-white">
      {/* Product page navbar background */}
      <div
        className="absolute left-0 top-0 z-0 h-[75px] w-full bg-cover bg-center bg-no-repeat lg:h-[90px]"
        style={{
          backgroundImage: "url('/images/navbg/navbg.png')",
        }}
      />

      <Navbar />

      <div className="pt-[75px] lg:pt-[90px]">
        {loading ? (
          <p className="py-10 text-center">Loading product...</p>
        ) : error ? (
          <p className="py-10 text-center text-red-500">{error}</p>
        ) : !product ? (
          <p className="py-10 text-center">Product not found.</p>
        ) : (
          <ProductViewComponent
            product={product}
            onAddToCart={onAddToCart}
          />
        )}
      </div>

      {!loading && !error && product && (
        <RelatedItem onAddToCart={onAddToCart} />
      )}

      <Footer />
    </div>
  );
};
