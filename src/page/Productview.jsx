import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductViewComponent from "../components/ProductViewComponent";

import newArrivals from "../data/newarrival";
import recentProducts from "../data/recent";
import RelatedItem from "../components/RelatedItem";

export const Productview = ({ onAddToCart }) => {
  const { id } = useParams();

  // Combine all products
  const allProducts = [...newArrivals, ...recentProducts];

  // Find selected product
  const product = allProducts.find((item) => String(item.id) === String(id));

  console.log("URL ID:", id);
  console.log("All products:", allProducts);
  console.log("Selected product:", product);

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
        <ProductViewComponent
          product={product}
          onAddToCart={onAddToCart}
        />{" "}
      </div>

      <RelatedItem onAddToCart={onAddToCart} />

      <Footer />
    </div>
  );
};
