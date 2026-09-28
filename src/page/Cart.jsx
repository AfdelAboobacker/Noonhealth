import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartComponent from "../components/CartComponent";

const Cart = ({ cartItems, increaseQuantity, decreaseQuantity }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* cart page navbar background */}
      <div
        className="absolute left-0 top-0 z-0 h-[75px] w-full bg-cover bg-center bg-no-repeat lg:h-[90px]"
        style={{
          backgroundImage: "url('/images/navbg/navbg.png')",
        }}
      />
      <Navbar />

      <div className="pt-[75px] lg:pt-[90px]">
        <CartComponent
          cartItems={cartItems}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
